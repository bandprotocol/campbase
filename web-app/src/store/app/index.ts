/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import PreSignIn from './PreSignIn/reducer'
import Register from './Register/reducer'

export default combineReducers({
  PreSignIn,
  Register,

  // ^^^ Add more reducers here
})
