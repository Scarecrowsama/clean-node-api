import { RequiredFieldsValiation } from '../../presentacion/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../presentacion/helpers/validators/validator-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentacion/helpers/validators/validation'
import { CompareFieldsValiation } from '../../presentacion/helpers/validators/compare-fields-validation'

jest.mock('../../presentacion/helpers/validators/validator-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValiation(field))
      validations.push(new CompareFieldsValiation('password', 'passwordConfirmation'))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
