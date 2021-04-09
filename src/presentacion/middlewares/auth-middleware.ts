import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await forbidden(new AccessDeniedError())
    return error
  }
}
