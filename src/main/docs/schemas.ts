import { accountSchema, loginParamsSchema, errorSchema, surveyAnswerSchema, surveySchema, surveysSchema, signupParamsSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultsSchema } from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultsSchema
}
