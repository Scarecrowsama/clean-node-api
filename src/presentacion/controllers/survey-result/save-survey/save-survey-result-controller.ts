import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentacion/errors'
import { forbidden } from '@/presentacion/helpers/http/httpHelper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return null
  }
}
