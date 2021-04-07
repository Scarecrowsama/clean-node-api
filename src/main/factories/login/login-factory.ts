import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../presentacion/protocols'
import { LoginController } from '../../../presentacion/controllers/login/login-controller'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LogMongoRepository } from '../../../infrastructure/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infrastructure/db/mongodb/account/acc-mongo-repositoryount'
import { BcryptAdapter } from '../../../infrastructure/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JWTAdapter } from '../../../infrastructure/cryptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bCryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bCryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
