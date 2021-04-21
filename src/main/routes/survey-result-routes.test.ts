import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infrastructure/db/mongodb/helpers/mongo-helper'

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /survey/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/survey/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
