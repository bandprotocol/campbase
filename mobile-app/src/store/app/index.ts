/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Auth from './Auth/reducer'
import User from './User/reducer'

export default combineReducers({
  Auth,
  User,

  // ^^^ Add more reducers here
})
