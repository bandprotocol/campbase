/**
 * Combined reducer for all api
 */

import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import * as AuthAPI from './Auth'

/** Helper function that turns an api map into reducer map */
export function getReducerMap(apiMap: { [k: string]: API }) {
  const reducerMap = {}
  Object.values(apiMap).forEach(api => {
    reducerMap[api.path] = api.reducer
  })
  return reducerMap
}

/** All reducers combined */
export default combineReducers({
  ...getReducerMap(AuthAPI),

  // ^^^ Add more reducers here
})
