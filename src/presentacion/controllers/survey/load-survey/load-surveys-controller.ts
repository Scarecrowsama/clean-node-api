import { ok } from '../../../helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()

    if (surveys) {
      return ok(surveys)
    }
    return null
  }
}
