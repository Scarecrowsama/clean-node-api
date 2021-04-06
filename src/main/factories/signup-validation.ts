import { ValidationComposite } from '../../presentacion/helpers/validators/validator-composite'
import { RequiredFieldsValidation } from '../../presentacion/helpers/validators/required-fields-validation'
import { Validation } from '../../presentacion/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentacion/helpers/validators/compare-fields-validation'
import { EmailValiDation } from '../../presentacion/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValiDation('email', new EmailValidatorAdapter()))
  }

  return new ValidationComposite(validations)
}
