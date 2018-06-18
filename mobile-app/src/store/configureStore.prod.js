/**
 * Create a store for prod environment.
 * It won't include all the awesome debug tools
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import { revive } from '~/store/app/Auth/action'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default (initialState = {}) => {
  /* Stack of middlewares to apply */
  const middlewares = [thunk]

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  // Revive session
  // store.dispatch(revive())

  return store
}
