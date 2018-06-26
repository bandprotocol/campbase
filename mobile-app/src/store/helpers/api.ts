/**
 * A helper class that handle all the hassles bundling API with redux
 */

import { Record } from 'immutable'
import { APIMethod } from 'spec/api/base'
import { query } from './query'
import { createScopedActionTypes } from './create-scoped-action-types'

export type APIParamsType<T> = T | ((state) => T)
export type APIResponseType<T> = Promise<(dispatch, getState) => Promise<T>>

const DefaultState = {
  fetching: false,
  success: null,
  error: null,
  data: null,
}

class State<Response> extends Record(DefaultState) {
  fetching: boolean
  success: boolean
  error: string
  data: Response
}

export class API<Params = any, Response = any> {
  private actionTypes: any

  constructor(
    public method: APIMethod,
    public path: string,
    private onSuccess?: (
      response: Response
    ) => (dispatch, getState) => Promise<any>,
    private onFail?: (message: string) => (dispatch, getState) => Promise<any>
  ) {
    if (!this.path) {
      throw new Error('Please pass a `path` to constructor')
    }

    this.actionTypes = createScopedActionTypes(`api:${this.path}`, [
      'FETCH',
      'SUCCESS',
      'FAIL',
    ])

    this.action = this.action.bind(this)
    this.reducer = this.reducer.bind(this)
  }

  async action(
    params: APIParamsType<Params>
  ): Promise<(dispatch, getState) => Promise<Response>> {
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
        dispatch({ type: this.actionTypes.FETCH })

        const responseData = await query<Params, Response>(
          this.path,
          this.method,
          queryParams,
          getState().app.Auth.jwt
        )

        dispatch({
          type: this.actionTypes.SUCCESS,
          payload: { data: responseData },
        })

        if (this.onSuccess) {
          dispatch(this.onSuccess(responseData))
        }

        return responseData
      } catch (e) {
        dispatch({
          type: this.actionTypes.FAIL,
          payload: { error: e.message },
        })

        if (this.onFail) {
          dispatch(this.onFail(e.message))
        }
      }
    }
  }

  /** A simple reducer for storing API status inside Redux */
  reducer(
    state = new State<Response>(DefaultState),
    {
      type,
      payload,
    }: { type: string; payload: { data: Response; error: string } }
  ): State<Response> {
    switch (type) {
      case this.actionTypes.FETCH:
        return new State<Response>({
          fetching: true,
          success: null,
          error: null,
          data: null,
        })
      case this.actionTypes.SUCCESS:
        return new State<Response>({
          fetching: false,
          success: true,
          error: null,
          data: payload.data,
        })
      case this.actionTypes.FAIL:
        return new State<Response>({
          fetching: false,
          success: false,
          error: payload.error,
          data: null,
        })
      default:
        return state
    }
  }
}

// export abstract class API {
//   private actionTypes: any

//   constructor(public path: string) {
//     if (!this.path) {
//       throw new Error('Please pass a `path` to constructor')
//     }

//     this.actionTypes = createScopedActionTypes(`api:${this.path}`, [
//       'REQUEST',
//       'SUCCESS',
//       'FAILURE',
//     ])

//     this.action = this.action.bind(this)
//     this.reducer = this.reducer.bind(this)

//     // App
//   }

//   /** Query methods to be overriden */
//   async GET(params: any): Promise<any> {
//     throw new Error(`Method GET not allowed for ${this.path}`)
//   }
//   async POST(params: any): Promise<any> {
//     throw new Error(`Method POST not allowed for ${this.path}`)
//   }
//   async PUT(params: any): Promise<any> {
//     throw new Error(`Method PUT not allowed for ${this.path}`)
//   }
//   async DELETE(params: any): Promise<any> {
//     throw new Error(`Method DELETE not allowed for ${this.path}`)
//   }

//   async action<Response, Params = any>(
//     method: APIMethod,
//     params: APIParamsType<Params>
//   ): Promise<(dispatch, getState) => Promise<Response>> {
//     const actionTypes = this.actionTypes
//     const path = this.path

//     return async (
//       dispatch: (action) => any,
//       getState: () => any
//     ): Promise<Response> => {
//       // Calculate query params
//       var queryParams
//       if (typeof params === 'function') {
//         queryParams = params(getState())
//       } else {
//         queryParams = params
//       }

//       // Start fetching
//       try {
//         dispatch({ type: actionTypes.REQUEST })

//         const response = await query<Response, Params>(
//           path,
//           method,
//           queryParams,
//           getState().app.Auth.jwt
//         )

//         // Save response to Redux store
//         if (response) {
//           //dispatch(updateDataFields(response))
//         }

//         dispatch({ type: actionTypes.SUCCESS })

//         return response
//       } catch (e) {
//         // DEBUG
//         console.error('Fail to fet', e)

//         dispatch({ type: actionTypes.FAILURE })`Method DELETE not allowed for `
//         throw Error(
//           `API ${this.path}:${method} failed with params ${queryParams}`
//         )
//       }
//     }
//   }

//   /** A simple reducer for storing API status inside Redux */
//   reducer(state = null, action) {
//     const actionTypes = this.actionTypes

//     switch (action.type) {
//       case actionTypes.REQUEST:
//         return 'REQUEST'
//       case actionTypes.SUCCESS:
//         return 'SUCCESS'
//       case actionTypes.FAILURE:
//         return 'FAILURE'
//       default:
//         return state
//     }
//   }
// }
