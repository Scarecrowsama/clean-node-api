import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/httpHelper'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requierdFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requierdFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
