/**
 * Utility for storing and retrieving the JWT
 */

import { AsyncStorage } from 'react-native'

export const JWTStorageKey = 'auth:jwt'

export async function setPersistentJWT(jwt: string) {
  await AsyncStorage.setItem(JWTStorageKey, jwt)
}

export async function getPersistentJWT() {
  return await AsyncStorage.getItem(JWTStorageKey)
}

export async function removePersistentJWT() {
  await AsyncStorage.removeItem(JWTStorageKey)
}
