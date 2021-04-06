import { ValidationComposite } from '../../../presentacion/helpers/validators/validator-composite'
import { RequiredFieldsValidation } from '../../../presentacion/helpers/validators/required-fields-validation'
import { Validation } from '../../../presentacion/helpers/validators/validation'
import { EmailValiDation } from '../../../presentacion/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValiDation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
