import { ValidationComposite, RequiredFieldsValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentacion/protocols/validation'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
