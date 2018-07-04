/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Auth from './Auth/reducer'
import User from './User/reducer'
import CreateWallet from './CreateWallet/reducer'

export default combineReducers({
  Auth,
  User,
  CreateWallet,

  // ^^^ Add more reducers here
})
