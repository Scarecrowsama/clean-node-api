import { RequiredFieldsValiation } from '../../presentacion/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../presentacion/helpers/validators/validator-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentacion/helpers/validators/validation'

jest.mock('../../presentacion/helpers/validators/validator-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValiation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
