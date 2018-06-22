/**
 * Everything Authentication-related
 */

import { getPersistentJWT } from '~/store/helpers/jwt'
import { createScopedActionTypes } from '~/store/helpers'

import { AuthLoginPhoneAPI } from '~/store/api/Auth'

export const actionTypes = createScopedActionTypes('app.Auth', [
  'REVIVE',
  'LOGOUT',
])

export const loginPhone = (
  country_code: string,
  phone_number: string,
  phone_pin: string
) => async (dispatch, getState) => {
  const result = await dispatch(
    AuthLoginPhoneAPI.POST({
      country_code,
      phone_number,
      phone_pin,
    })
  )
}

/* Revive session */
export const revive = () => async (dispatch, getState) => {
  try {
    // Get JWT
    const jwt = await getPersistentJWT()

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
  dispatch({ type: actionTypes.LOGOUT })
}
