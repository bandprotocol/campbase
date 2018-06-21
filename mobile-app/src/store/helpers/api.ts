/**
 * A helper class that handle all the hassles bundling API with redux
 *
 * Note that we always assume that only --> one <-- gets called at a time
 * for any given resource
 */

import { APIMethod } from 'spec/api/base'
import createScopedActionTypes from './create-scoped-action-types'
import { SERVER_ENDPOINT } from '~/config'

export default class API {
  public actionTypes

  constructor(public path: string, public methods: Array<APIMethod>) {
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
  action(params: object | ((state) => object) = {}) {
    // Prevent API call after hot-reload
    // This enables us to have a smooth dev experience ;)

    const actionTypes = this.actionTypes
    const path = this.path

    return

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
          throw new Error(
            `API param of ${this.path} have to be function or object`
          )
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

  /** A simple reducer for storing API status inside Redux */
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
