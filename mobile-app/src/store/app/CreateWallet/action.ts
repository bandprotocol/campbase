import { Alert } from 'react-native'
import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'
import { UserMe } from '~/store/api'
import BandProtocolClient from 'bandprotocol'

enum actions {
  SET_WALLET = 'SET_WALLET',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_ENCRYPTED_KEY = 'SET_ENCRYPTED_KEY',
}
export const actionTypes = createScopedActionTypes('app.CreateWallet', actions)

export const generateNewWallet: AsyncActionCreator<any> = () => async (
  dispatch,
  getState
) => {
  const { mnemonic, address } = BandProtocolClient.generateRandomKey()

  dispatch({
    type: actionTypes.SET_WALLET,
    payload: { mnemonic, address },
  })
}

export const setPassword: SyncActionCreator<any> = (password: string) => ({
  type: actionTypes.SET_PASSWORD,
  payload: { value: password },
})

export const setEncryptedKey: SyncActionCreator<any> = (key: string) => ({
  type: actionTypes.SET_ENCRYPTED_KEY,
  payload: { value: key },
})
