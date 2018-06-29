/**
 * Combined reducer for all api
 */

import { combineReducers, Reducer } from 'redux'
import { API } from '../helpers/api'
import * as AuthRequestPin from './AuthRequestPin'
import * as AuthValidatePin from './AuthValidatePin'
import * as UserSignUp from './UserSignUp'

export default combineReducers({
  AuthRequestPin: AuthRequestPin.default,
  AuthValidatePin: AuthValidatePin.default,
  UserSignUp: UserSignUp.default,

  // ^^^ Add more reducers here
})

export { AuthRequestPin, AuthValidatePin, UserSignUp }
