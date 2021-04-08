import { badRequest } from '../../../helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (htttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(htttpRequest.body)

    if (error) {
      return badRequest(error)
    }

    return new Promise(resolve => resolve(null))
  }
}
