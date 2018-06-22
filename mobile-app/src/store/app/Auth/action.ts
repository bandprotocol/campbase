/**
 * Everything Authentication-related
 */

import { AsyncStorage } from 'react-native'
import { createScopedActionTypes } from '~/store/helpers'

export const actionTypes = createScopedActionTypes('app.Auth', [
  'REVIVE',
  'LOGOUT',
])

/* Revive session */
export const revive = () => async (dispatch, getState) => {
  try {
    // Get JWT
    const jwt = getState().app.Auth.get('jwt')

    if (jwt) {
      // Store success state
      dispatch({
        type: actionTypes.REVIVE,
        payload: {
          jwt,
        },
      })
    }
  } catch (e) {
    // Nothing here :)
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    // Get JWT
    const jwt = getState().app.Auth.get('jwt')

    if (jwt) {
      // Store success state
      dispatch({
        type: actionTypes.LOGOUT,
        payload: {
          jwt,
        },
      })
    }
  } catch (e) {
    // Nothing here :)
  }
}
