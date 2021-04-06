import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jwt-adapter'

interface SutTypes {
  sut: JWTAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JWTAdapter('secret')
  return {
    sut
  }
}

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
