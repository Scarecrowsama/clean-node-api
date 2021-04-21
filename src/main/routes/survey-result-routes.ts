import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/adminAuth'
import { makeSaveSurveyResultController } from '@/main//factories/controllers/survey-result/save-survey-result/save-survey-controller-factory'

export default (router: Router): void => {
  router.put('/survey/:surveyId/results', adminAuth, adaptRoute(makeSaveSurveyResultController()))
}
