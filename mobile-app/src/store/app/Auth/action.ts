/**
 * Everything Authentication-related
 */

import { Alert } from 'react-native'
import { getPersistentJWT } from '~/store/helpers/jwt'
import { createScopedActionTypes } from '~/store/helpers'

import { AuthRequestPin, AuthValidatePin } from '~/store/api'

enum actions {
  REVIVE = 'REVIVE',
  LOGOUT = 'LOGOUT',
  PHONE_AUTH = 'PHONE_AUTH',
}
export const actionTypes = createScopedActionTypes('app.Auth', actions)

export const requestPin = (
  country_code: string,
  phone_number: string
) => async (dispatch, getState) => {
  try {
    await dispatch(
      AuthRequestPin.POST.action({
        country_code,
        phone_number,
      })
    )

    dispatch({
      type: actionTypes.PHONE_AUTH,
      payload: {
        country_code,
        phone_number,
      },
    })
  } catch (e) {
    console.log(e)
    // TODO: Display error
    Alert.alert('Pin Request Failed', 'Please try again with different number')
    return false
  }
  return true
}

export const validatePin = (phone_pin: string) => async (
  dispatch,
  getState
) => {
  const { country_code, phone_number } = getState().app.Auth

  const result = await dispatch(
    AuthValidatePin.POST.action({
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
