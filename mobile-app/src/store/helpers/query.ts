/**
 * Utility for sending request to server
 */

import Axios, { AxiosInstance, AxiosError } from 'axios'
import { APIMethod, APIResponse } from 'spec/api/base'
import { SERVER_ENDPOINT } from '~/config'
import { getPathParams, populatePath } from './path'

let axiosInstance: AxiosInstance

export async function initializeQuery(): Promise<AxiosInstance> {
  axiosInstance = Axios.create({
    baseURL: SERVER_ENDPOINT,
    timeout: 1000,
  })
  return axiosInstance
}

export class QueryException extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
}

export async function query<Params = any, Response = any>(
  path: string,
  method: APIMethod,
  params: Params,
  jwt: string
): Promise<Response> {
  if (!axiosInstance) initializeQuery()

  // Calculate path to call (inject params to path)
  const url: string = populatePath(path, params)

  // Calculate real params
  const pathParams: (keyof Params)[] = getPathParams(path)
  const realParams: Partial<Params> = Object.assign(params, {})
  pathParams.forEach(p => delete realParams[p])

  try {
    // Make a call
    const axiosResponse = await axiosInstance.request({
      method,
      url,

      // Use url params in GET
      params: method === APIMethod.GET ? realParams : {},

      // Use json data in POST | PUT | DELETE
      data: method === APIMethod.GET ? {} : realParams,

      // User
      headers: jwt
        ? {
            Authorization: `Bearer ${jwt}`,
          }
        : {},
    })

    const axiosData = <APIResponse<Response>>axiosResponse.data

    return axiosData.data
  } catch (e) {
    if (e.response) {
      const axiosData = <APIResponse<Response>>e.response.data
      throw new QueryException(axiosData.status, axiosData.error)
    } else throw e
  }
}
