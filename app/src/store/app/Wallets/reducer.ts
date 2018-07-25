/**
 * User!
 */

import { actionTypes } from './action'
import { createStateRecord } from '~/store'

const DefaultState = {
  wallets: {},
  newWallet: {
    secret_key: null,
    mnemonic: null,
    address: null,
    passcode: null,
  },
} as {
  wallets: any
  newWallet: {
    secret_key: string
    mnemonic: string[]
    address: string
    passcode: string
  }
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

export default (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case actionTypes.SET_WALLETS:
      return state.set('wallets', payload.wallets)
    case actionTypes.SET_NEW_WALLET:
      return state.set('newWallet', {
        ...state.newWallet,
        secret_key: payload.secret_key,
        mnemonic: payload.mnemonic,
        address: payload.address,
      })
    case actionTypes.SET_NEW_WALLET_PASSCODE:
      return state.set('newWallet', {
        ...state.newWallet,
        passcode: payload.passcode,
      })
    case actionTypes.RESET_NEW_WALLET:
      return state.set('newWallet', DefaultState.newWallet)
    default:
      return state
  }
}
