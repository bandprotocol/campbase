/**
 * Special connect decorator that exposes wrapped component for testing purpose
 */

import { connect } from 'react-redux'

export default (mapStateToProps, mapActionsToProps) => wrappedComponent => {
  const connectedComponent = connect(
    (state, ownProps) => mapStateToProps(state, ownProps || {}),
    mapActionsToProps
  )(wrappedComponent)
  connectedComponent.__component__ = wrappedComponent
  return connectedComponent
}
