import { AuthSignUp } from '~/store/api'

export const login = (userName, password, rememberMe) => {
  return dispatch => {
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
  }
}

export const register = (userName, password, email, secretCode) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'REGISTER_ATTEMPT',
      })

      const output = await dispatch(
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
    }
  }
}
