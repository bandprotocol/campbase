import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'
import { Wallets } from '~/store/api'
import BandProtocolClient from 'bandprotocol'

enum actions {
  SET_WALLET = 'SET_WALLET',
  SET_PASSCODE = 'SET_PASSCODE',
  RESET = 'RESET',
}
export const actionTypes = createScopedActionTypes('app.CreateWallet', actions)

export const resetNewWallet: SyncActionCreator<any> = () => ({
  type: actionTypes.RESET,
  payload: {},
})

export const generateNewWallet: AsyncActionCreator<any> = () => async (
  dispatch,
  getState
) => {
  const {
    privateKey: private_key,
    mnemonic,
    address,
  } = BandProtocolClient.generateRandomKey()

  dispatch(resetNewWallet())

  dispatch({
    type: actionTypes.SET_WALLET,
    payload: { private_key, mnemonic, address },
  })
}

export const setPasscode: SyncActionCreator<any> = (password: string) => ({
  type: actionTypes.SET_PASSCODE,
  payload: { value: password },
})

export const saveWallet: AsyncActionCreator<any> = () => async (
  dispatch,
  getState
) => {
  const { private_key, passcode } = getState().app.CreateWallet

  const client = new BandProtocolClient({ keyProvider: private_key })

  const encrypted_key = client.key.encrypt(passcode)

  console.log('encrypted_key', encrypted_key, passcode)

  await dispatch(
    Wallets.POST.action({
      address: client.key.getAddress(),
      encrypted_key,
    })
  )
}
