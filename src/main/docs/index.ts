import { loginPath } from './paths/'
import { badRequest, serverError, unauthorized, notFound } from './components/'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas/'

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
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
