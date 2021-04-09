import { AccountMongoRepository } from '../../../../../infrastructure/db/mongodb/account/acc-mongo-repositoryount'
import { BcryptAdapter } from '../../../../../infrastructure/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../../domain/usecases/add-account'
import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
