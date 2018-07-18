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
  success: false,
  error: '',
  data: null,
}

const StateRecord = createStateRecord(defaultState as StateType<any>)

export class API<Params = any, Response = any> {
  private actionTypes: any

  constructor(
    public name: string,
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
          localStorage.getItem('jwt') || ''
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
        return new StateRecord({
          fetching: true,
          success: false,
          error: '',
          data: null,
        })
      case this.actionTypes.SUCCESS:
        return new StateRecord({
          fetching: false,
          success: false,
          error: '',
          data: payload.data,
        })
      case this.actionTypes.FAIL:
        return new StateRecord({
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
