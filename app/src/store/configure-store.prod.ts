/**
 * Create a store for prod environment.
 * It won't include all the awesome debug tools
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { reviveWallets } from '~/store/app/Wallets/action'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'

export default async function configureStoreProd(initialState = {}) {
  /* Stack of middlewares to apply */
  const middlewares = [thunk]

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  // Revive session
  await store.dispatch(reviveWallets() as any)

  return store
}
