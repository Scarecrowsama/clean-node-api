import { Hasher, AddAccountRepository, CheckAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { mockAddAccountRepository, mockCheckAccountByEmailRepository, mockHasher } from '@/data/test'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository()
  // jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValue(Promise.resolve(null))
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, checkAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if LoadAccountByEmailRepository returns null', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddAccountParams())
    await expect(isValid).toBe(true)
  })

  test('Should return true on success', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.add(mockAddAccountParams())
    await expect(isValid).toBe(false)
  })

  test('Should return false if CheckAccountRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await sut.add(mockAddAccountParams())
    await expect(isValid).toBe(false)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
    await sut.add(mockAccountModel())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
