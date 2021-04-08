import { RequiredFieldsValidation, EmailValiDation, CompareFieldsValidation } from '../../../../validation/validators'
import { ValidationComposite } from '../../../../validation/validators/validator-composite'
import { makeSignUpValidation } from './signup-validation-factory'
import { Validation } from '../../../../presentacion/protocols/validation'
import { EmailValidator } from '../../../../validation/protocols/emailValidator'

jest.mock('../../../../validation/validators/validator-composite')

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
