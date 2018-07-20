import { AuthSignUp, AuthLogin } from '~/store/api'
import { AsyncActionCreator } from '~/store/interfaces'
import { push } from 'connected-react-router'

export const login: AsyncActionCreator<boolean> = (
  userName: string,
  password: string,
  rememberMe: string
) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN_ATTEMPT',
    })

    try {
      const output = await dispatch(
        AuthLogin.POST.action({
          username: userName,
          password,
        })
      )

      if (output.jwt) {
        localStorage.setItem('jwt', output.jwt)

        dispatch({
          type: 'LOGIN_SUCCESS',
        })

        dispatch(push('/register')) // TODO only when user have no community setup

        return true
      }
    } catch (e) {
      console.error(e)

      dispatch({
        type: 'LOGIN_FAILED',
        payload: {
          message: e.message,
        },
      })

      return false
    }

    dispatch({
      type: 'LOGIN_FAILED',
      payload: {},
    })

    return false
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

export const changeTab = (changeToTab: string) => {
  return {
    type: 'CHANGE_TAB',
    payload: { changeToTab },
  }
}
