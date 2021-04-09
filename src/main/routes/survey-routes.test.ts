import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import app from '../config/app'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo-helper'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /survey', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/survey')
        .send({
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
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with a valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Tanausu',
        email: 'tana@elsosa.com',
        password: 'joajoajoa',
        role: 'admin'
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

      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send({
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
          ]
        })
        .expect(204)
    })
  })
})
