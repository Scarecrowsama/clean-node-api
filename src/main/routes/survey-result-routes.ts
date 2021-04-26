import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSaveSurveyResultController } from '@/main//factories/controllers/survey-result/save-survey-result/save-survey-controller-factory'
import { auth } from '../middlewares/auth'
import { makeLoadSurveyResultController } from '../factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/survey/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/survey/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
