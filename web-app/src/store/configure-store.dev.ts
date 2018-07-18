/**
 * Create a store for prod environment.
 * It won't include all the awesome debug tools
 */

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'

export const history = createBrowserHistory()

const initialState = {}

/* Stack of middlewares to apply */
const middlewares = [
  thunk,
  routerMiddleware(history)
]

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(applyMiddleware(...middlewares)),
)

export default store
