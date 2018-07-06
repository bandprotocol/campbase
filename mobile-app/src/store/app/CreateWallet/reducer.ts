/**
 * User!
 */

import { actionTypes } from './action'
import { createStateRecord } from '~/store'

const DefaultState = {
  mnemonic: null,
  address: null,
  password: null,
  encryptedKey: null,
} as {
  mnemonic: string[]
  address: string
  password: string
  encryptedKey: string
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

export default (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case actionTypes.SET_WALLET:
      return state
        .set('mnemonic', payload.mnemonic)
        .set('address', payload.address)
    case actionTypes.SET_PASSWORD:
      return state.set('password', payload.value)
    case actionTypes.SET_ENCRYPTED_KEY:
      return state.set('encryptedKey', payload.value)
    default:
      return state
  }
}
