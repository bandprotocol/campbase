/**
 * Everything Authentication-related
 */
import { Alert } from 'react-native'
import {
  setPersistentJWT,
  getPersistentJWT,
  removePersistentJWT,
} from '~/store/helpers/jwt'

import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'
import { AuthRequestPin, AuthValidatePin } from '~/store/api'
import { AuthValidatePin as AuthValidatePinSpec } from 'spec/api/auth'

enum actions {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PHONE_AUTH = 'PHONE_AUTH',
}
export const actionTypes = createScopedActionTypes('app.Auth', actions)

export const requestPin: AsyncActionCreator<boolean> = (
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
    // TODO: Display error
    Alert.alert('PIN Request Failed', 'Please try again with different number')
    return false
  }
  return true
}

export const validatePin: AsyncActionCreator<
  AuthValidatePinSpec.POST.response
> = (phone_pin: string) => async (dispatch, getState) => {
  const { country_code, phone_number } = getState().app.Auth

  try {
    const result = await dispatch(
      AuthValidatePin.POST.action({
        country_code,
        phone_number,
        phone_pin,
      })
    )

    if (result.account_created) {
      dispatch(signup(result.jwt))
    } else {
      dispatch(login(result.jwt))
    }

    return result
  } catch (e) {
    Alert.alert('PIN Validation Failed', 'Please make sure the PIN is correct.')
    return null
  }
}

/* Revive session */
export const revive: AsyncActionCreator<void> = () => async (
  dispatch,
  getState
) => {
  try {
    // Get JWT
    const jwt = await getPersistentJWT()

    if (jwt) {
      // Store success state
      dispatch({
        type: actionTypes.LOGIN,
        payload: {
          jwt,
        },
      })
    }
  } catch (e) {
    // Nothing here :)
  }
}

export const signup: SyncActionCreator<any> = jwt => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: actionTypes.SIGNUP,
      payload: {
        jwt,
      },
    })
  } catch (e) {
    // Nothing here :)
  }
}

export const login: AsyncActionCreator<void> = jwt => async (
  dispatch,
  getState
) => {
  try {
    await setPersistentJWT(jwt)

    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        jwt,
      },
    })
  } catch (e) {
    // Nothing here :)
  }
}

export const logout: AsyncActionCreator<void> = () => async (
  dispatch,
  getState
) => {
  try {
    await removePersistentJWT()
    dispatch({ type: actionTypes.LOGOUT })
  } catch (e) {
    // Nothing here :)
  }
}
