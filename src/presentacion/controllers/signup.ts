import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/httpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requierdFields = ['name', 'email']

    for (const field of requierdFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
