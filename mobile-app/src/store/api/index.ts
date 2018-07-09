/**
 * Combined reducer for all api
 */

import { combineReducers, Reducer } from 'redux'
import { API } from '../helpers/api'
import * as AuthRequestPin from './AuthRequestPin'
import * as AuthValidatePin from './AuthValidatePin'
import * as UserSignUp from './UserSignUp'
import * as UserMe from './UserMe'
import * as UserWallets from './UserWallets'
import * as Wallets from './Wallets'

export default combineReducers({
  AuthRequestPin: AuthRequestPin.default,
  AuthValidatePin: AuthValidatePin.default,
  UserSignUp: UserSignUp.default,
  UserMe: UserMe.default,
  UserWallets: UserWallets.default,
  Wallets: Wallets.default,

  // ^^^ Add more reducers here
})

export {
  AuthRequestPin,
  AuthValidatePin,
  UserSignUp,
  UserWallets,
  UserMe,
  Wallets,
}
