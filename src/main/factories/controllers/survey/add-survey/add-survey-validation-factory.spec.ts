import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { Validation } from '@/presentacion/protocols/validation'

jest.mock('../../../../../validation/validators/validator-composite')

describe('AddSurvey Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
