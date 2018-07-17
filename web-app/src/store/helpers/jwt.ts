/**
 * Utility for storing and retrieving the JWT
 */

export const JWTStorageKey = 'auth:jwt'

export async function setPersistentJWT(jwt: string) {
  await localStorage.setItem(JWTStorageKey, jwt)
}

export async function getPersistentJWT() {
  return localStorage.getItem(JWTStorageKey)
}

export async function removePersistentJWT() {
  localStorage.removeItem(JWTStorageKey)
}
