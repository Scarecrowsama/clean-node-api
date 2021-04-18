import { AuthMiddleware } from '@/presentacion/middlewares/auth-middleware'
import { Middleware } from '@/presentacion/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token.ts/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
