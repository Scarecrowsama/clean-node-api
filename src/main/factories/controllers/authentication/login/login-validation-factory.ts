import { ValidationComposite, RequiredFieldsValidation, EmailValiDation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentacion/protocols/validation'
import { EmailValidatorAdapter } from '../../../../../infrastructure/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValiDation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
