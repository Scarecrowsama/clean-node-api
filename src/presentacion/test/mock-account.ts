import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAcountStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }

  return new LoadAccountByTokenStub()
}
