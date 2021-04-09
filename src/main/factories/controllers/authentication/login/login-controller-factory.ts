import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../../presentacion/protocols'
import { LoginController } from '../../../../../presentacion/controllers/authentication/login/login-controller'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}