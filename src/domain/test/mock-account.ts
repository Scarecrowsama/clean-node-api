import { AddAccount, AuthenticationParams } from '@/presentacion/controllers/authentication/signup/signup-controller-protocols'
import { AccountModel } from '@/presentacion/middlewares/auth-middleware-protocols'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
