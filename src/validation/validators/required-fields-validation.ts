
import { Validation } from '@/presentacion/protocols'
import { MissingParamError } from '@/presentacion/errors'

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
