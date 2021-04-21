import { Controller } from '@/presentacion/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentacion/controllers/survey-result/save-survey/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey-result/load-survey-by-id/db-load-survey-by-id-result-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
