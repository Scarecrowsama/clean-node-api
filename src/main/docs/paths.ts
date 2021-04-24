import { loginPath, surveysPath, signupPath, surveyResultPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/survey': surveysPath,
  '/survey/{surveyId}/results': surveyResultPath
}
