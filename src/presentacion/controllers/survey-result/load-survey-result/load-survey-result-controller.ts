import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { InvalidParamError } from '@/presentacion/errors'
import { forbidden, ok, serverError } from '@/presentacion/helpers/http/httpHelper'
import { Controller, HttpResponse } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request
      const exists = await this.checkSurveyById.checkById(surveyId)

      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
