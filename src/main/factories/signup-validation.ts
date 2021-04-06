import { ValidationComposite } from '../../presentacion/helpers/validators/validator-composite'
import { RequiredFieldsValiation } from '../../presentacion/helpers/validators/required-fields-validation'
import { Validation } from '../../presentacion/helpers/validators/validation'
import { CompareFieldsValiation } from '../../presentacion/helpers/validators/compare-fields-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValiation(field))
    validations.push(new CompareFieldsValiation('password', 'passwordConfirmation'))
  }

  return new ValidationComposite(validations)
}
