import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Tana',
        email: 'tanita@tanasosa.com',
        password: 'joajoajoa',
        passwordConfirmation: 'joajoajoa'
      })
      .expect(200)
  })
})
