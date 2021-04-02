import { EmailValidator } from '../presentacion/protocols/emailValidator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
