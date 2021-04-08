import { badRequest } from '../../../helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (htttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(htttpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const { question, answers } = htttpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })

    return null
  }
}
