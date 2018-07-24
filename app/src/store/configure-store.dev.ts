/**
 * Create a store for prod environment.
 * It won't include all the awesome debug tools
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { revive } from '~/store/app/Auth/action'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'

declare var global: { store }

export default async function configureStoreDev(initialState = {}) {
  /* Stack of middlewares to apply */
  const middlewares = [thunk]

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  // Revive session
  await store.dispatch(revive())

  // Expose store for debugging purpose
  global.store = store

  return store
}
