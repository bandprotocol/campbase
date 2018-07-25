/**
 * Redux connect
 */

import * as React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { StateType } from '~/store'

/**
 * @param stateToProps See @connect
 * @param actionsToProps See @connect
 */

export const connect = <
  WrappedProps,
  StateToPropsReturn extends object,
  ActionsToPropsReturn extends object
>(
  stateToProps: ((
    state: StateType,
    ownProps: WrappedProps
  ) => StateToPropsReturn) = () => <StateToPropsReturn>{},
  actionsToProps: ((
    dispatch: Dispatch,
    ownProps: WrappedProps
  ) => ActionsToPropsReturn) = () => <ActionsToPropsReturn>{}
) => (BaseComponent: React.ComponentType<WrappedProps>) => {
  type MergedProps = StateToPropsReturn & ActionsToPropsReturn

  return reduxConnect<
    StateToPropsReturn,
    ActionsToPropsReturn,
    WrappedProps & MergedProps,
    MergedProps,
    StateType
  >(
    // mapStateToProps
    (state, ownProps): StateToPropsReturn => {
      return stateToProps(state, ownProps) as StateToPropsReturn
    },
    // mapDispatchToProps
    (dispatch, ownProps): ActionsToPropsReturn => {
      return actionsToProps(dispatch, ownProps) as ActionsToPropsReturn
    },
    // mergeProps
    (stateProps, dispatchProps, ownProps) => {
      return Object.assign({}, stateProps, dispatchProps, ownProps)
    }
  )(BaseComponent)
}
