/**
 * Everything Authentication-related
 */

import { AsyncStorage } from 'react-native'
import { createScopedActionTypes } from '~/store/helpers'

export const actionTypes = createScopedActionTypes('app.Auth', [
  'PIN_REQUEST',
  'PIN_SUCCESS',
  'PIN_FAILURE',
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
  'REVIVE',
  'LOGOUT',
])

/* Revive session */
export const revive = () => async (dispatch, getState) => {
  try {
    // Get JWT
    const jwt = await AsyncStorage.getItem('jwt')

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
