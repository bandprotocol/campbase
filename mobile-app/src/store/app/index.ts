/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Auth from './Auth/reducer'

export default combineReducers({
  Auth,

  // ^^^ Add more reducers here
})
