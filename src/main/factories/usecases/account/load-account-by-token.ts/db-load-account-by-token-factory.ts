import { AccountMongoRepository } from '../../../../../infrastructure/db/mongodb/account/acc-mongo-repositoryount'
import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JWTAdapter } from '../../../../../infrastructure/cryptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
