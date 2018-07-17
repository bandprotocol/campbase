export const login = (userName, password, rememberMe) => {
  return (dispatch) => {
    // TODO some login async logic
    
    return { 
      type: 'LOGIN',
      userName,
      password,
      rememberMe
    }
  }
}