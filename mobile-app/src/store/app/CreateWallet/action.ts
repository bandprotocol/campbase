import { Alert } from 'react-native'
import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'
import { UserMe } from '~/store/api'

enum actions {
  SET_MNEMONIC = 'SET_MNEMONIC',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_ENCRYPTED_KEY = 'SET_ENCRYPTED_KEY',
}
export const actionTypes = createScopedActionTypes('app.CreateWallet', actions)

export const setMnemonic: SyncActionCreator<any> = (mnemonic: string[]) => ({
  type: actionTypes.SET_MNEMONIC,
  payload: { value: mnemonic },
})

export const setAddress: SyncActionCreator<any> = (address: string) => ({
  type: actionTypes.SET_ADDRESS,
  payload: { value: address },
})

export const setPassword: SyncActionCreator<any> = (password: string) => ({
  type: actionTypes.SET_PASSWORD,
  payload: { value: password },
})

export const setEncryptedKey: SyncActionCreator<any> = (key: string) => ({
  type: actionTypes.SET_ENCRYPTED_KEY,
  payload: { value: key },
})
