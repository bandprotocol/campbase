/**
 * Everything Authentication-related
 */

import { fromJS } from 'immutable'
import { actionTypes } from './action'

const initialState = fromJS({
  jwt: null,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.REVIVE:
      return state.set('jwt', payload.jwt)

    default:
      return state
  }
}
