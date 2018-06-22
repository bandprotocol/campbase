/**
 * A helper class that handle all the hassles bundling API with redux
 *
 * Note: make sure that --> only ONE method <-- gets called at a time
 * for any given resource, since we only use one set for the
 */

import { APIMethod } from 'spec/api/base'
import { query } from './query'
import { createScopedActionTypes } from './create-scoped-action-types'

export type APIParamsType<T> = T | ((state) => T)
export type APIResponseType<T> = Promise<(dispatch, getState) => Promise<T>>

export abstract class API {
  protected path: string
  private actionTypes: any

  constructor() {
    if (!this.path) {
      throw new Error('Please set this.path before calling super()')
    }

    this.actionTypes = createScopedActionTypes(`api:${this.path}`, [
      'REQUEST',
      'SUCCESS',
      'FAILURE',
    ])

    this.action = this.action.bind(this)
    this.reducer = this.reducer.bind(this)
  }

  async GET(params: any): Promise<any> {
    throw new Error(`Method GET not allowed for ${this.path}`)
  }

  async POST(params: any): Promise<any> {
    throw new Error(`Method POST not allowed for ${this.path}`)
  }

  async PUT(params: any): Promise<any> {
    throw new Error(`Method PUT not allowed for ${this.path}`)
  }

  async DELETE(params: any): Promise<any> {
    throw new Error(`Method DELETE not allowed for ${this.path}`)
  }

  async action<Response, Params = any>(
    method: APIMethod,
    params: APIParamsType<Params>
  ): Promise<(dispatch, getState) => Promise<Response>> {
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

        const response = await query<Response, Params>(
          path,
          method,
          queryParams,
          getState().app.Auth.get('jwt')
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
