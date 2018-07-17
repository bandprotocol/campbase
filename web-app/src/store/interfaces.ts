import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, ActionCreator } from 'redux'
import { StateType } from './root-reducer'

export type AsyncActionCreator<R> = ActionCreator<
  ThunkAction<Promise<R>, StateType, void, Action>
>
export type SyncActionCreator<A> = ActionCreator<A>
export { StateType }
