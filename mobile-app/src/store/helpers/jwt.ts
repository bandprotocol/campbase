/**
 * Utility for storing and retrieving the JWT
 */

import { AsyncStorage } from 'react-native'

export const JWTStorageKey = 'auth:jwt'

export async function setJWT(jwt: string) {
  await AsyncStorage.setItem(JWTStorageKey, jwt)
}

export async function getJWT() {
  await AsyncStorage.getItem(JWTStorageKey)
}
