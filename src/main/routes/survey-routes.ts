import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveyController } from '../factories/controllers/survey/load-surveys/load-survey-controller-factory'
import { adminAuth } from '../middlewares/adminAuth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/survey', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/survey', auth, adaptRoute(makeLoadSurveyController()))
}
