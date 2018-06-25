/**
 * Everything Authentication-related
 */

import { Record } from 'immutable'
import { actionTypes } from './action'

const DefaultState = {
  jwt: null,
}

class State extends Record(DefaultState) {
  jwt: string
}

export default (state = new State(DefaultState), { type, payload }) => {
  switch (type) {
    case actionTypes.REVIVE:
      return state.set('jwt', payload.jwt)

    case actionTypes.LOGOUT:
      return state.remove('jwt')

    default:
      return state
  }
}
