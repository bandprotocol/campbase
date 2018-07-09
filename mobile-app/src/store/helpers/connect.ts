/**
 * Redux connect + API access
 */

import * as React from 'react'
import { bindActionCreators as bindActions } from 'redux'
import { Dispatch, connect as reduxConnect } from 'react-redux'
import { API } from './api'

/**
 * @param apis An object mapping from alias to { fetch, ...apiState }
 * @param stateToProps See @connect
 * @param actionsToProps See @connect
 *
 * @return A class which
 * 1.
 * 2. exposes an object <api> as a prop
 *    api: {
 *      [alias] : {
 *        fetch: <a function to call fetch>,
 *        ...apiState: <state in API>
 *      }
 *    }
 */

interface State {
  api: any
}

export const connect = <
  WrappedProps,
  StateToPropsReturn extends object,
  ActionsToPropsReturn extends object,
  ApiArg extends { [alias in keyof ApiArg]: API }
>(
  stateToProps: ((
    state: State,
    ownProps: WrappedProps
  ) => StateToPropsReturn) = () => null,
  actionsToProps: ((
    dispatch: Dispatch,
    ownProps: WrappedProps
  ) => ActionsToPropsReturn) = () => null,
  apis: ApiArg = null
) => (BaseComponent: React.ComponentType<WrappedProps>) => {
  type WithAliasKey = { [K in keyof ApiArg]: any }

  type InjectedProps<T> = {
    api: T
  }

  type StateProps = StateToPropsReturn & {
    API_STATE: Partial<WithAliasKey>
  }

  type FetchProps = ActionsToPropsReturn & {
    API_FETCH: Partial<WithAliasKey>
  }

  type MergedProps = StateToPropsReturn &
    ActionsToPropsReturn &
    InjectedProps<WithAliasKey>

  return reduxConnect<
    StateProps,
    FetchProps,
    WrappedProps & MergedProps,
    MergedProps,
    State
  >(
    // mapStateToProps
    (state, ownProps): StateProps => {
      const apiState: Partial<WithAliasKey> = {}
      Object.keys(apis || {}).forEach(alias => {
        const api = apis[alias]
        apiState[alias] = state.api[api.name][api.method]
      })

      return Object.assign({ API_STATE: apiState }, stateToProps(
        state,
        ownProps
      ) as StateToPropsReturn)
    },
    // mapDispatchToProps
    (dispatch, ownProps): FetchProps => {
      const apiAction = {}

      Object.keys(apis || {}).forEach(
        alias => (apiAction[alias] = apis[alias].action)
      )

      return Object.assign(
        { API_FETCH: bindActions(apiAction, dispatch) },
        actionsToProps(dispatch, ownProps) as ActionsToPropsReturn
      )
    },
    // mergeProps
    (stateProps, dispatchProps, ownProps) => {
      const apiProps: Partial<WithAliasKey> = {}
      Object.keys(apis || {}).forEach(alias => {
        apiProps[alias] = Object.assign(
          {
            fetch: dispatchProps.API_FETCH[alias],
          },
          stateProps.API_STATE[alias]
        )
      })

      const props = Object.assign({}, stateProps, dispatchProps, ownProps, {
        api: apiProps,
      })
      delete props.API_STATE, delete props.API_FETCH
      return props
    }
  )(BaseComponent)
}
