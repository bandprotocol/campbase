import { SecureStore } from 'expo'
import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'
import BandProtocolClient from 'bandprotocol'

enum actions {
  // New wallet
  SET_NEW_WALLET = 'SET_NEW_WALLET',
  SET_NEW_WALLET_PASSCODE = 'SET_NEW_WALLET_PASSCODE',
  RESET_NEW_WALLET = 'RESET_NEW_WALLET',

  // User wallets
  SET_WALLETS = 'SET_WALLETS',
}
export const actionTypes = createScopedActionTypes('app.Wallets', actions)

export const resetNewWallet: SyncActionCreator<any> = () => ({
  type: actionTypes.RESET_NEW_WALLET,
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
    type: actionTypes.SET_NEW_WALLET,
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
    type: actionTypes.SET_NEW_WALLET,
    payload: {
      secret_key: client.key.getSecretKey(),
      mnemonic,
      address: client.key.getAddress(),
    },
  })
}

export const setPasscode: SyncActionCreator<any> = (passcode: string) => ({
  type: actionTypes.SET_NEW_WALLET_PASSCODE,
  payload: { passcode },
})

export const saveWallet: AsyncActionCreator<any> = () => async (
  dispatch,
  getState
) => {
  const { secret_key, passcode } = getState().app.Wallets.newWallet

  const client = new BandProtocolClient({ keyProvider: secret_key })
  const encrypted_secret_key = client.key.encrypt(passcode)

  const wallets = {
    ...getState().app.Wallets.wallets,
    [client.key.getAddress()]: encrypted_secret_key,
  }

  await SecureStore.setItemAsync('wallets', JSON.stringify(wallets))

  dispatch({
    type: actionTypes.SET_WALLETS,
    payload: { wallets },
  })
}

export const reviveWallets: AsyncActionCreator<any> = () => async dispatch => {
  const wallets = JSON.parse(
    (await SecureStore.getItemAsync('wallets')) || '{}'
  )

  dispatch({
    type: actionTypes.SET_WALLETS,
    payload: { wallets },
  })
}
