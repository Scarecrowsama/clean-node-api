import { loginPath, surveysPath, signupPath } from './paths/'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'
import { accountSchema, loginParamsSchema, errorSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema, signupParamsSchema, addSurveyParamsSchema } from './schemas/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API from Mango\'s course to create surveys for coders.',
    version: '1.0.0'
  },
  license: {
    name: 'SIC',
    url: 'https://siccode.com/sic-code/9651/regulation-licensing-inspection-commercial-sectors'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/survey': surveysPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
