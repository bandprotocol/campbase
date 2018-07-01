/**
 * Everything Authentication-related
 */

import { actionTypes } from './action'
import { createStateRecord } from '~/store'

const DefaultState = {
  jwt: null,
  country_code: null,
  phone_number: null,
  account_created: false,
} as {
  jwt: string
  country_code: string
  phone_number: string
  account_created: boolean
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

export default (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case actionTypes.SIGNUP:
      return
      state.set('jwt', payload.jwt).set('account_created', false)

    case actionTypes.LOGIN:
      return state.set('jwt', payload.jwt).set('account_created', true)

    case actionTypes.LOGIN:
      return state.set('jwt', payload.jwt).set('account_created', true)

    case actionTypes.LOGOUT:
      return state.remove('jwt')

    case actionTypes.PHONE_AUTH:
      return state
        .set('country_code', payload.country_code)
        .set('phone_number', payload.phone_number)

    default:
      return state
  }
}
