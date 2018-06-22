/**
 * Special connect decorator that exposes wrapped component for testing purpose
 */

import { connect as reduxConnect } from 'react-redux'

export const connect = (
  mapStateToProps,
  mapActionsToProps?
) => wrappedComponent => {
  const connectedComponent = reduxConnect(
    (state, ownProps) => mapStateToProps(state, ownProps || {}),
    mapActionsToProps
  )(wrappedComponent)
  // connectedComponent.__component__ = wrappedComponent
  return connectedComponent
}
