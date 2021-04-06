export interface AccessTokenRepository {
  update: (id: string, token: string) => Promise<void>
}
