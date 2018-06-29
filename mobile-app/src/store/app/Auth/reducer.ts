/**
 * Everything Authentication-related
 */

import { Record } from 'immutable'
import { actionTypes } from './action'

const DefaultState = {
  jwt: null,
  country_code: null,
  phone_number: null,
}

class State extends Record(DefaultState) {
  jwt: string
  country_code: string
  phone_number: string
}

export default (state = new State(DefaultState), { type, payload }) => {
  switch (type) {
    case actionTypes.REVIVE:
      return state.set('jwt', payload.jwt)

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
