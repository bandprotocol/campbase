/**
 * A helper class that handle all the hassles bundling API with redux
 */

import { Record } from 'immutable'
import { APIMethod } from 'spec/api/base'
import { query } from './query'
import { createScopedActionTypes } from './create-scoped-action-types'
import { createStateRecord, StateRecordType, AsyncActionCreator } from '~/store'

export type APIParamsType<T> = T | ((state) => T)
export type APIResponseType<T> = Promise<(dispatch, getState) => Promise<T>>

enum actions {
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

type StateType<Response> = {
  fetching: boolean
  success: boolean
  error: string
  data: Response
}

const defaultState = {
  fetching: false,
  success: null,
  error: null,
  data: null,
}

const StateRecord = createStateRecord(defaultState as StateType<any>)

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

    this.actionTypes = createScopedActionTypes(`api:${this.path}`, actions)

    this.action = this.action.bind(this)
    this.reducer = this.reducer.bind(this)
  }

  action: AsyncActionCreator<Response> = (
    params: APIParamsType<Params> = <Params>{}
  ) => {
    return async (dispatch, getState) => {
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

        throw e
      }
    }
  }

  /** A simple reducer for storing API status inside Redux */
  reducer(
    state = new StateRecord(),
    {
      type,
      payload,
    }: { type: string; payload: { data: Response; error: string } }
  ): StateRecordType<Response> {
    switch (type) {
      case this.actionTypes.FETCH:
        return <StateRecordType<Response>>new StateRecord({
          fetching: true,
          success: null,
          error: null,
          data: null,
        })
      case this.actionTypes.SUCCESS:
        return <StateRecordType<Response>>new StateRecord({
          fetching: false,
          success: true,
          error: null,
          data: payload.data,
        })
      case this.actionTypes.FAIL:
        return <StateRecordType<Response>>new StateRecord({
          fetching: false,
          success: false,
          error: payload.error,
          data: null,
        })
      default:
        return <StateRecordType<Response>>state
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
