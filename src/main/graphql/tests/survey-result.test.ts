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

describe('SurveyResult GraphQL', () => {
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

  describe('SurveyResult Query', () => {
    const surveyResultQuery = gql`
      query surveyResult ($surveyId: String!) {
        surveyResult (surveyId: $surveyId) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `

    test('Should return a survey result on success', async () => {
      const accessToken = await makeAccessToken()
      const surveyResult = await surveyCollection.insertOne({
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
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyResult.ops[0]._id.toString()
        }
      })
      expect(res.data.surveyResult.question).toBe('Question')
      expect(res.data.surveyResult.answers[0]).toEqual({
        answer: 'Answer 1',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      })
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyResult = await surveyCollection.insertOne({
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
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyResult.ops[0]._id.toString()
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access Denied.')
    })
  })
})
