/**
 * Combined reducer for all api
 */

import { combineReducers, Reducer } from 'redux'
import { API } from '../helpers/api'
import * as AuthLoginEmail from './AuthLoginEmail'
import * as AuthLoginPhone from './AuthLoginPhone'
import * as AuthRegister from './AuthRegister'
import * as AuthRequestPin from './AuthRequestPin'

export default combineReducers({
  AuthLoginEmail: AuthLoginEmail.default,
  AuthLoginPhone: AuthLoginPhone.default,
  AuthRegister: AuthRegister.default,
  AuthRequestPin: AuthRequestPin.default,

  // ^^^ Add more reducers here
})

export { AuthLoginEmail, AuthLoginPhone, AuthRegister, AuthRequestPin }
