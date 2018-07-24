/**
 * Combine all reducers as a rootReducer. Use this for Redux!
 */

import { combineReducers, Reducer } from 'redux'
import app from './app'

const RootReducer = combineReducers({
  app,

  // ^^^ Add more reducers here
})

type StateTypeExtract<R> = R extends Reducer<infer S> ? S : null
export type StateType = StateTypeExtract<typeof RootReducer>

export default RootReducer
