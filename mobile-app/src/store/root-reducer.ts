/**
 * Combine all reducers as a rootReducer. Use this for Redux!
 */

import { combineReducers, Reducer } from 'redux'
import app from './app'
import api from './api'

const RootReducer = combineReducers({
  app,
  api,

  // ^^^ Add more reducers here
})

type StateTypeExtract<R> = R extends Reducer<infer S> ? S : null
export type StateType = StateTypeExtract<typeof RootReducer>

export default RootReducer
