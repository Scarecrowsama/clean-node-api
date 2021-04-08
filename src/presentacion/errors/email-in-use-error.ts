export class EmailInUseError extends Error {
  constructor () {
    super('Email address already in use.')
    this.name = 'EmailInUseError'
  }
}
