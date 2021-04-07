import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import app from '../config/app'
import { MongoHelper } from '../../infrastructure/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('joajoajoa', 12)
      await accountCollection.insertOne({
        name: 'Tana',
        email: 'tanita@tanasosa.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'tanita@tanasosa.com',
          password: 'joajoajoa'
        })
        .expect(200)
    })
  })
})
