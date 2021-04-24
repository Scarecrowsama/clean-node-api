import paths from './paths'
import components from './components'
import schemas from './schemas'

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
  paths: paths,
  schemas: schemas,
  components: components
}
