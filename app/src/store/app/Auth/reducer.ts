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
  is_login: false,
} as {
  jwt: string
  country_code: string
  phone_number: string
  account_created: boolean
  is_login: boolean
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

export default (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case actionTypes.SIGNUP:
      return state
        .set('jwt', payload.jwt)
        .set('account_created', false)
        .set('is_login', false)

    case actionTypes.LOGIN:
      return state
        .set('jwt', payload.jwt)
        .set('account_created', true)
        .set('is_login', true)

    case actionTypes.LOGOUT:
      return state.remove('jwt').set('is_login', false)

    case actionTypes.PHONE_AUTH:
      return state
        .set('country_code', payload.country_code)
        .set('phone_number', payload.phone_number)

    default:
      return state
  }
}
