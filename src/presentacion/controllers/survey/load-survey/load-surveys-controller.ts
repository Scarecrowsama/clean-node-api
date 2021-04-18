import { noContent, ok, serverError } from '@/presentacion/helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      if (surveys) {
        return surveys.length ? ok(surveys) : noContent()
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
