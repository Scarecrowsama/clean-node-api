import { ValidationComposite } from '../../presentacion/helpers/validators/validator-composite'
import { RequiredFieldsValiation } from '../../presentacion/helpers/validators/required-fields-validation'
import { Validation } from '../../presentacion/helpers/validators/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValiation(field))
  }

  return new ValidationComposite(validations)
}
