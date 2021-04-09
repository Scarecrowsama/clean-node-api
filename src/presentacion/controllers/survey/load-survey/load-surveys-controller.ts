import { ok, serverError } from '../../../helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      if (surveys) {
        return ok(surveys)
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
