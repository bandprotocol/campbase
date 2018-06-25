/**
 * Redux connect + API access
 */

import { bindActionCreators as bindActions, AnyAction } from 'redux'
import { Dispatch } from 'react-redux'
import { connect } from './connect'
import { API } from './api'

/**
 * @param {object} apis An object mapping from alias to API instance
 * @param {function} stateToProps See @connect
 * @param {function} actionsToProps See @connect
 *
 * @return {function} A decorator which exposes these objects
 *   - fetch: a object mapping API path to fetching dispatcher
 *   - apiStatus: a object mapping API path to status of fetching the API
 *   - apiHasLoaded: a object mapping API path to whether the API has successfully loaded before
 *   - apiHasFailed: a object mapping API path to whether the API has failed before
 */

const connectAPI = (
  apis: { [alias: string]: API },
  stateToProps = (state?, ownProps?, apiStatus?) => null,
  actionsToProps = (dispatch?, getState?) => null
) => WrappedComponent =>
  connect(
    (state, ownProps) => {
      const apiStatus = {}
      const apiHasLoaded = {}
      const apiHasFailed = {}

      Object.keys(apis).forEach(alias => {
        apiStatus[alias] = state.api[apis[alias].path].status
        apiHasLoaded[alias] = apiStatus[alias]
          ? apiStatus[alias].startsWith('2')
          : undefined
        apiHasFailed[alias] = apiStatus[alias]
          ? !apiStatus[alias].startsWith('2')
          : undefined
      })

      return {
        ...stateToProps(state, ownProps, apiStatus),
        apiStatus,
        apiHasLoaded,
        apiHasFailed,
      }
    },

    (dispatch: Dispatch<AnyAction>) => {
      const apiAction = {}

      Object.keys(apis).forEach(
        alias => (apiAction[alias] = apis[alias].action)
      )

      return {
        ...actionsToProps(dispatch),
        fetch: bindActions(apiAction, dispatch),
      }
    }
  )(WrappedComponent)

export default connectAPI
