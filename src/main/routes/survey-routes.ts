import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveyController } from '@/main/factories/controllers/survey/load-surveys/load-survey-controller-factory'
import { adminAuth } from '@/main/middlewares/adminAuth'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/survey', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/survey', auth, adaptRoute(makeLoadSurveyController()))
}
