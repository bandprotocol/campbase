import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { ActionCreator } from 'react-redux'
import { StateType } from './root-reducer'

// Overload Redux's bindActionCreators
// declare module 'redux' {
//   export function bindActionCreators<
//     M extends {
//       [k in keyof M]:
//         | AsyncActionCreator<ReturnType<M[k]>>
//         | SyncActionCreator<ReturnType<M[k]>>
//     }
//   >(
//     actionCreators: M,
//     dispatch: ThunkDispatch<StateType, void, Action>
//   ): { [k in keyof M]: (...args: any[]) => ThunkAction<ReturnType<M[k]>, StateType, void, Action> }
// }

export type AsyncActionCreator<R> = ActionCreator<
  ThunkAction<Promise<R>, StateType, void, Action>
>
export type SyncActionCreator<A> = ActionCreator<A>
export { StateType }
