import { combineReducers, Reducer } from 'redux'
import api from './api'
import PreSignIn from './PreSignIn/reducer'

const RootReducer = combineReducers({
  PreSignIn,
  api,
})

type StateTypeExtract<R> = R extends Reducer<infer S> ? S : null
export type StateType = StateTypeExtract<typeof RootReducer>

export default RootReducer
