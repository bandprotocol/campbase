import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { ActionCreator } from 'react-redux'
import { StateType } from './root-reducer'

export { StateType }

export type AsyncActionCreator<R> = ActionCreator<
  ThunkAction<Promise<R>, StateType, void, Action> & Promise<R>
>
export type SyncActionCreator<A> = ActionCreator<A>
