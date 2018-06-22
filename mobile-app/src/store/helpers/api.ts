/**
 * A helper class that handle all the hassles bundling API with redux
 *
 * Note: make sure that --> only ONE method <-- gets called at a time
 * for any given resource, since we only use one set for the
 */

import { APIMethod } from 'spec/api/base'
import { query } from './query'
import createScopedActionTypes from './create-scoped-action-types'

export type APIActionParams = object | ((state) => object)

export default class API {
  public actionTypes

  constructor(public path: string, public methods: APIMethod[]) {
    this.actionTypes = createScopedActionTypes(`api:${this.path}`, [
      'REQUEST',
      'SUCCESS',
      'FAILURE',
    ])

    this.action = this.action.bind(this)
    this.reducer = this.reducer.bind(this)
  }

  async GET<Params, Response>(
    params: Params | ((state) => Params)
  ): Promise<(dispatch, getState) => Promise<Response>> {
    if (!this.methods.includes(APIMethod.GET))
      throw new Error(`Method GET not allowed for ${this.path}`)
    return this.action<Params, Response>(APIMethod.GET, params)
  }

  async POST<Params, Response>(
    params: Params | ((state) => Params)
  ): Promise<(dispatch, getState) => Promise<Response>> {
    if (!this.methods.includes(APIMethod.POST))
      throw new Error(`Method POST not allowed for ${this.path}`)
    return this.action<Params, Response>(APIMethod.POST, params)
  }

  async PUT<Params, Response>(
    params: Params | ((state) => Params)
  ): Promise<(dispatch, getState) => Promise<Response>> {
    if (!this.methods.includes(APIMethod.PUT))
      throw new Error(`Method PUT not allowed for ${this.path}`)
    return this.action<Params, Response>(APIMethod.PUT, params)
  }

  async DELETE<Params, Response>(
    params: Params | ((state) => Params)
  ): Promise<(dispatch, getState) => Promise<Response>> {
    if (!this.methods.includes(APIMethod.DELETE))
      throw new Error(`Method DELETE not allowed for ${this.path}`)
    return this.action<Params, Response>(APIMethod.DELETE, params)
  }

  async action<Params, Response>(
    method: APIMethod,
    params: Params | ((state) => Params)
  ): Promise<(dispatch2, getState) => Promise<Response>> {
    const actionTypes = this.actionTypes
    const path = this.path

    return async (
      dispatch: (action) => any,
      getState: () => any
    ): Promise<Response> => {
      // Calculate query params
      var queryParams
      if (typeof params === 'function') {
        queryParams = params(getState())
      } else {
        queryParams = params
      }

      // Start fetching
      try {
        dispatch({ type: actionTypes.REQUEST })

        const response = await query<Params, Response>(
          path,
          method,
          queryParams
        )

        // Save response to Redux store
        if (response) {
          //dispatch(updateDataFields(response))
        }

        dispatch({ type: actionTypes.SUCCESS })

        return response
      } catch (e) {
        // DEBUG
        console.error('Fail to fet', e)

        dispatch({ type: actionTypes.FAILURE })`Method DELETE not allowed for `
        throw Error(
          `API ${this.path}:${method} failed with params ${queryParams}`
        )
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
