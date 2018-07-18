/**
 * Combined reducer for all api
 */

import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import * as AuthSignUp from '~/store/api/AuthSignUp'
import * as AuthLogin from '~/store/api/AuthLogin'

export default combineReducers({
  AuthRequestPin: AuthSignUp.default,
  AuthLogin: AuthLogin.default,
})

export { AuthSignUp, AuthLogin }
