/**
 * Everything Authentication-related
 */

import { Record } from 'immutable'
import { actionTypes } from './action'

const RecordState = Record({
  jwt: null,
})

class State extends RecordState {
  jwt: string = null
}

export default (state = new State(), { type, payload }) => {
  switch (type) {
    case actionTypes.REVIVE:
      return state.set('jwt', payload.jwt)

    case actionTypes.LOGOUT:
      return state.remove('jwt')

    default:
      return state
  }
}
