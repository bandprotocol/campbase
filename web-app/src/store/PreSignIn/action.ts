import { AuthSignUp } from '~/store/api'
import { AsyncActionCreator } from '~/store/interfaces'

export const login: AsyncActionCreator<boolean> = (
  userName: string,
  password: string,
  rememberMe: string
) => {
  return async dispatch => {
    // TODO some login async logic
    dispatch({
      type: 'LOGIN_ATTEMPT',
    })

    if (userName === password) {
      dispatch({
        type: 'LOGIN_SUCCESS',
      })
    } else {
      dispatch({
        type: 'LOGIN_FAILED',
      })
    }

    return true
  }
}

export const register: AsyncActionCreator<boolean> = (
  userName: string,
  password: string,
  email: string,
  secretCode: string
) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'REGISTER_ATTEMPT',
      })

      await dispatch(
        AuthSignUp.POST.action({
          username: userName,
          password,
          email,
          secret_code: secretCode,
        })
      )

      dispatch({
        type: 'REGISTER_SUCCESSFUL',
      })
    } catch (e) {
      console.error(e)
      dispatch({
        type: 'REGISTER_FAILED',
      })
      return false
    }

    return true
  }
}
