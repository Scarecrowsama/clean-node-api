export const surveyResultPath = {
  put: {
    security: [
      {
        apiKeyAuth: []
      }
    ],
    tags: ['Survey'],
    summary: 'API to create an answer to a survey.',
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams'
          }
        }
      }
    },
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    security: [
      {
        apiKeyAuth: []
      }
    ],
    tags: ['Survey'],
    summary: 'API to load the result of a survey.',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
