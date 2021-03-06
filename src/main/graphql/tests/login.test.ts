import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { MongoHelper } from '@/infrastructure/db/mongodb/helpers'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    test('Should return an account on success', async () => {
      const password = await hash('joajoajoa', 12)
      await accountCollection.insertOne({
        name: 'Tana',
        email: 'tanita@tanasosa.com',
        password
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'tanita@tanasosa.com',
          password: 'joajoajoa'
        }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Tana')
    })

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'tanita@tanasosa.com',
          password: 'joajoajoa'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('Signup Mutation', () => {
    const signupMutation = gql`
      mutation signUp ($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        signUp (name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
          accessToken
          name
        }
      }
    `

    test('Should return an account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'Tanita',
          email: 'tanita@tanasosa.com',
          password: 'joajoajoa',
          passwordConfirmation: 'joajoajoa'
        }
      })
      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe('Tanita')
    })

    test('Should return EmailInUseError if email exists', async () => {
      const password = await hash('joajoajoa', 12)
      await accountCollection.insertOne({
        name: 'Tana',
        email: 'tanita@tanasosa.com',
        password
      })
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'Tanita',
          email: 'tanita@tanasosa.com',
          password: 'joajoajoa',
          passwordConfirmation: 'joajoajoa'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Email address already in use.')
    })
  })
})
