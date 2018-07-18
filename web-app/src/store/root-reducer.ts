import { combineReducers, Reducer } from 'redux'
import api from './api'
import app from './app'

const RootReducer = combineReducers({
  app,
  api,
})

type StateTypeExtract<R> = R extends Reducer<infer S> ? S : null
export type StateType = StateTypeExtract<typeof RootReducer>

export default RootReducer
