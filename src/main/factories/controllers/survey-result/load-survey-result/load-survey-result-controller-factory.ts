import { Controller } from '@/presentacion/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factory'
import { LoadSurveyResultController } from '@/presentacion/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbCheckdSurveyById } from '@/main/factories/usecases/survey/check-survey/check-survey-by-id-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbCheckdSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
