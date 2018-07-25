/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Wallets from './Wallets/reducer'

export default combineReducers({
  Wallets,

  // ^^^ Add more reducers here
})
