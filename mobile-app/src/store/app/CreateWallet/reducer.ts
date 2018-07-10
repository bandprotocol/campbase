/**
 * User!
 */

import { actionTypes } from './action'
import { createStateRecord } from '~/store'

const DefaultState = {
  secret_key: null,
  mnemonic: null,
  address: null,
  passcode: null,
} as {
  secret_key: string
  mnemonic: string[]
  address: string
  passcode: string
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
        .set('secret_key', payload.secret_key)
        .set('mnemonic', payload.mnemonic)
        .set('address', payload.address)
    case actionTypes.SET_PASSCODE:
      return state.set('passcode', payload.value)
    case actionTypes.RESET:
      return new StateRecord()
    default:
      return state
  }
}
