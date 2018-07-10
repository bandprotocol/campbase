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
    secretKey: secret_key,
    mnemonic,
    address,
  } = BandProtocolClient.generateRandomKey()

  dispatch(resetNewWallet())

  dispatch({
    type: actionTypes.SET_WALLET,
    payload: { secret_key, mnemonic, address },
  })
}

export const recoverWallet: AsyncActionCreator<any> = (
  mnemonic: string[]
) => async (dispatch, getState) => {
  const client = new BandProtocolClient({
    keyProvider: { mnemonic },
  })

  if (!client.key) {
    throw new Error('Invalid mnemonic')
  }

  dispatch(resetNewWallet())

  dispatch({
    type: actionTypes.SET_WALLET,
    payload: {
      secret_key: client.key.getSecretKey(),
      mnemonic,
      address: client.key.getAddress(),
    },
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
  const { secret_key, passcode } = getState().app.CreateWallet

  const client = new BandProtocolClient({ keyProvider: secret_key })

  const encrypted_secret_key = client.key.encrypt(passcode)

  // console.log('encrypted_secret_key >', encrypted_secret_key)
  // console.log('passcode      >', passcode)
  // console.log('secret_key   >', secret_key)

  const recovered = new BandProtocolClient({
    keyProvider: { secretbox: encrypted_secret_key, passcode },
  })

  // console.log('recovered     >', recovered)

  // const success = BandProtocolClient.__tools__.SecretBox.decrypt(
  //   encrypted_secret_key,
  //   passcode
  // )

  // console.log('Decrypt Result:', success)

  await dispatch(
    Wallets.POST.action({
      verify_key: client.key.getVerifyKey(),
      encrypted_secret_key,
    })
  )
}
