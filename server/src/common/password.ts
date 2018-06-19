import * as Bcrypt from 'bcrypt'

export const PASSWORD_SALT_ROUNDS = 10

export function generateHash(password: string): Promise<string> {
  return Bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
}

export function verifyHash(raw: string, hashed: string): Promise<boolean> {
  return Bcrypt.compare(raw, hashed)
}
