/**
 * Combined reducer for all api
 */

import { combineReducers } from 'redux'
import * as AuthAPI from './Auth'

/** Helper function that turns an api map into reducer map */
export function getReducerMap(apiMap) {
  const reducerMap = {}
  Object.keys(apiMap).forEach(apiName => {
    reducerMap[apiName] = apiMap[apiName].reducer
  })
  return reducerMap
}

/** All reducers combined */
export default combineReducers({
  ...getReducerMap(AuthAPI),

  // ^^^ Add more reducers here
})
