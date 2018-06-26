/**
 * Redux connect + API access
 */

import * as React from 'react'
import { bindActionCreators as bindActions } from 'redux'
import { Dispatch, connect } from 'react-redux'
import { API } from './api'

type InjectedProps<T> = {
  api: T
}

/**
 * @param apis An object mapping from alias to { fetch, ...apiState }
 * @param stateToProps See @connect
 * @param actionsToProps See @connect
 *
 * @return A decorator which exposes an object <api> as a prop
 *   api: {
 *     [alias] : {
 *       fetch: <a function to call fetch>,
 *       ...apiState: <state in API>
 *     }
 *   }
 */
export const connectAPI = <
  StateToPropsReturn extends object,
  ActionsToPropsReturn extends object,
  ApiArg extends { [alias: string]: API }
>(
  apis: ApiArg,
  stateToProps: (state?, ownProps?, apiStatus?) => StateToPropsReturn,
  actionsToProps: (dispatch?, getState?) => ActionsToPropsReturn
) => {
  type WithAliasKey = { [K in keyof ApiArg]: any }

  return <
    WrappedProps extends StateToPropsReturn &
      ActionsToPropsReturn &
      InjectedProps<WithAliasKey>
  >(
    WrappedComponent: React.ComponentType<WrappedProps>
  ) => {
    interface State {
      api: any
    }

    type StateProps = StateToPropsReturn & {
      API_STATE: Partial<WithAliasKey>
    }

    type FetchProps = ActionsToPropsReturn & {
      API_FETCH: Partial<WithAliasKey>
    }

    type MergedProps = WrappedProps &
      StateToPropsReturn &
      ActionsToPropsReturn &
      InjectedProps<WithAliasKey>

    return connect<StateProps, FetchProps, WrappedProps, MergedProps, State>(
      // mapStateToProps
      (state, ownProps): StateProps => {
        const apiState: Partial<WithAliasKey> = {}
        Object.keys(apis).forEach(alias => {
          const api = apis[alias]
          apiState[alias] = state.api[api.path][api.method]
        })

        return Object.assign({ API_STATE: apiState }, stateToProps(
          state,
          ownProps,
          apiState
        ) as StateToPropsReturn)
      },
      // mapDispatchToProps
      (dispatch: Dispatch): FetchProps => {
        const apiAction = {}

        Object.keys(apis).forEach(
          alias => (apiAction[alias] = apis[alias].action)
        )

        return Object.assign(
          { API_FETCH: bindActions(apiAction, dispatch) },
          actionsToProps(dispatch) as ActionsToPropsReturn
        )
      },
      // mergeProps
      (stateProps, dispatchProps, ownProps) => {
        const apiProps: Partial<WithAliasKey> = {}
        Object.keys(apis).forEach(alias => {
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
    )(WrappedComponent)
  }
}
