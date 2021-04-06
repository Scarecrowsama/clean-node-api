import { RequiredFieldsValidation } from './required-fields-validation'
import { MissingParamError } from '../../errors'

describe('Required Fields Validation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
