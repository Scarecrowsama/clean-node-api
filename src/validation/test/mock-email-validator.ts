import { EmailValidator } from '@/presentacion/controllers/authentication/signup/signup-controller-protocols'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
