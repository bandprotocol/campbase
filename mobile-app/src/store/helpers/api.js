/**
 * A helper class that handle all the hassles bundling API with redux
 */

import { createScopedActionTypes } from './create-scoped-action-types'
import { SERVER_ENDPOINT } from '~/config'

export default class API {
  constructor(name, path) {
    this.path = path
    this.name = name

    this.actionTypes = createScopedActionTypes(`api:${this.path}`, [
      'REQUEST',
      'SUCCESS',
      'FAILURE',
    ])

    this.action = this.action.bind(this)
    this.reducer = this.reducer.bind(this)
  }

  query(params) {
    return query(this.path, params)
  }

  /**
   * @param {function/object} params Object/Function that takes state as a parameter, and returns parameter object for the api call
   * @return {Promise}
   */
  action(params = {}) {
    // Prevent API call after hot-reload
    // This enables us to have a smooth dev experience ;)
    if (window.justHotReloaded) return () => {}

    const actionTypes = this.actionTypes
    const path = this.path
    const name = this.name

    return async (dispatch, getState) => {
      try {
        dispatch({ type: actionTypes.REQUEST })

        // Calculate query params
        var queryParams
        if (typeof params === 'function') {
          queryParams = params(getState())
        } else if (typeof params === 'object') {
          queryParams = params
        } else {
          throw Error(`API param of ${this.name} have to be function or object`)
        }

        const response = await query(path, queryParams)

        // Populate data (derived)
        if (response.data) {
          dispatch(updateDataFields(response.data))
        }

        dispatch({ type: actionTypes.SUCCESS })

        return response
      } catch (e) {
        // DEBUG
        console.error('API', name, 'Error:', e)

        dispatch({ type: actionTypes.FAILURE })

        throw Error(`API ${name} Error: ${e}`)
      }
    }
  }

  /** A typical reducer for storing API status inside Redux */
  reducer(state = null, action) {
    const actionTypes = this.actionTypes

    switch (action.type) {
      case actionTypes.REQUEST:
        return 'REQUEST'
      case actionTypes.SUCCESS:
        return 'SUCCESS'
      case actionTypes.FAILURE:
        return 'FAILURE'
      default:
        return state
    }
  }
}
