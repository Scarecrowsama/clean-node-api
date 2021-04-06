import { RequiredFieldsValidation } from '../../../presentacion/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../../presentacion/helpers/validators/validator-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../../presentacion/helpers/validators/validation'
import { CompareFieldsValidation } from '../../../presentacion/helpers/validators/compare-fields-validation'
import { EmailValiDation } from '../../../presentacion/helpers/validators/email-validation'
import { EmailValidator } from '../../../presentacion/protocols/emailValidator'

jest.mock('../../../presentacion/helpers/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValiDation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
