export const login = (userName, password, rememberMe) => {
  return (dispatch) => {
    // TODO some login async logic
    
    dispatch({ 
      type: 'LOGIN',
      userName,
      password,
      rememberMe
    })
  }
}