import { RequiredFieldsValidation, ValidationComposite, EmailValiDation } from '../../../presentacion/helpers/validators/'
import { makeLoginValidation } from './login-validation'
import { Validation } from '../../../presentacion/protocols/validation'
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

describe('Login Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }

    validations.push(new EmailValiDation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
