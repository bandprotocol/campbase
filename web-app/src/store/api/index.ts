/**
 * Combined reducer for all api
 */

import { combineReducers } from 'redux'
import { API } from '../helpers/api'
import * as AuthSignUp from './AuthSignUp'

export default combineReducers({
  AuthRequestPin: AuthSignUp.default,
})

export { AuthSignUp }
