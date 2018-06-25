/**
 * Special connect decorator that exposes wrapped component for testing purpose
 */

import { connect as reduxConnect } from 'react-redux'

export const connect = (
  stateToProps = (state?, ownProps?, apiStatus?) => null,
  actionsToProps = (dispatch?, getState?) => null
) => wrappedComponent => {
  const connectedComponent = reduxConnect(
    (state, ownProps = {}) => stateToProps(state, ownProps),
    actionsToProps
  )(wrappedComponent)
  // connectedComponent.__component__ = wrappedComponent
  return connectedComponent
}
