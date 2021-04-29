import { Controller } from '@/presentacion/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentacion/controllers/survey-result/save-survey/save-survey-result-controller'
import { makeDbLoadAnswersBySurvey } from '@/main/factories/usecases/survey-result/load-survey-by-id/db-load-answers-by-survey-result-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
