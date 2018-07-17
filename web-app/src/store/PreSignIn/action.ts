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
