/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import PreSignIn from '~/store/app/PreSignIn/reducer'
import Register from '~/store/app/Register/reducer'

export default combineReducers({
  PreSignIn,
  Register,

  // ^^^ Add more reducers here
})
