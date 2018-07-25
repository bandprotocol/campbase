/**
 * Combine all reducers as a rootReducer. Use this for Redux!
 */

import { combineReducers, Reducer } from 'redux'
import app from './app'

type StateTypeExtract<R> = R extends Reducer<infer S> ? S : null
type StateType = { app: StateTypeExtract<typeof app> }

const RootReducer = combineReducers<StateType>({
  app,

  // ^^^ Add more reducers here
})

export { StateType }
export default RootReducer
