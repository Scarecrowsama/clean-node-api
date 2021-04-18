import { ValidationComposite, CompareFieldsValidation, EmailValiDation } from '@/validation/validators'
import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'
import { Validation } from '@/presentacion/protocols/validation'
import { EmailValidatorAdapter } from '@/infrastructure/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValiDation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
