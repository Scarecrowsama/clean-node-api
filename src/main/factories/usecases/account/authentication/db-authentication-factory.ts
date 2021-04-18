import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '@/infrastructure/db/mongodb/account/acc-mongo-repositoryount'
import { BcryptAdapter } from '@/infrastructure/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JWTAdapter } from '@/infrastructure/cryptography/jwt-adapter/jwt-adapter'
import { Authentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bCryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bCryptAdapter, jwtAdapter, accountMongoRepository)
}
