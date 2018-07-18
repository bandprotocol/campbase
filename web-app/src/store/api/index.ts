/**
 * Combined reducer for all api
 */

import { combineReducers } from 'redux'
import { API } from '../helpers/api'
import * as AuthSignUp from './AuthSignUp'
import * as AuthLogin from './AuthLogin'

export default combineReducers({
  AuthRequestPin: AuthSignUp.default,
  AuthLogin: AuthLogin.default
})

export { AuthSignUp, AuthLogin }
