/**
 * Combine all reducers as a rootReducer. Use this for Redux!
 */

import { combineReducers } from 'redux'
import app from './app'
import api from './api'

export default combineReducers({
  app,
  //api,

  // ^^^ Add more reducers here
})
