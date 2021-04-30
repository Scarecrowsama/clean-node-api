import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { MongoHelper } from '@/infrastructure/db/mongodb/helpers'
import { makeApolloServer } from './helpers'

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Tanausu',
    email: 'tana@elsosa.com',
    password: 'joajoajoa'
  })
  const id = res.ops[0]._id
  const accessToken = await sign({ id }, env.jwtSecret)

  await accountCollection.updateOne(
    {
      _id: id
    }, {
      $set: {
        accessToken
      }
    }
  )

  return accessToken
}

let accountCollection: Collection
let surveyCollection: Collection
let apolloServer: ApolloServer

describe('Survey GraphQL', () => {
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
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `

    test('Should return surveys on success', async () => {
      const accessToken = await makeAccessToken()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name/image1.jpg',
            answer: 'Answer 1'
          },
          {
            image: 'http://image-name/image2.jpg',
            answer: 'Answer 2'
          }
        ],
        date: new Date()
      })
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const res: any = await query(surveysQuery)
      expect(res.data.surveys.length).toBe(1)
      expect(res.data.surveys[0].question).toBe('Question')
      expect(res.data.surveys[0].answers[0].answer).toBe('Answer 1')
      expect(res.data.surveys[0].didAnswer).toBe(false)
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name/image1.jpg',
            answer: 'Answer 1'
          },
          {
            image: 'http://image-name/image2.jpg',
            answer: 'Answer 2'
          }
        ],
        date: new Date()
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(surveysQuery)
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access Denied.')
    })
  })
})
