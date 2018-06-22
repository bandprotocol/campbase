/**
 * Utility for sending request to server
 */

import Axios, { AxiosInstance } from 'axios'
import { APIMethod } from 'spec/api/base'
import { SERVER_ENDPOINT } from '~/config'
import { getJWT } from './jwt'
import { getPathParams, populatePath } from './path'

let axiosInstance: AxiosInstance

export async function initializeQuery(): Promise<AxiosInstance> {
  const jwt = await getJWT()
  axiosInstance = Axios.create({
    baseURL: SERVER_ENDPOINT,
    timeout: 1000,
    headers: jwt
      ? {
          Authorization: `Bearer ${jwt}`,
        }
      : {},
  })
  return axiosInstance
}

export async function query<Params, Response>(
  path: string,
  method: APIMethod,
  params: Params,
  bypassJWT = false
): Promise<Response> {
  if (!axiosInstance) initializeQuery()

  const jwt = bypassJWT && (await getJWT())

  // Calculate path to call (inject params to path)
  const url: string = populatePath(path, params)

  // Calculate real params
  const pathParams: (keyof Params)[] = getPathParams(path)
  const realParams: Partial<Params> = Object.assign(params, {})
  pathParams.forEach(p => delete realParams[p])

  // Make a call
  const result = await axiosInstance.request({
    method,
    url,

    // Use url params in GET
    params: method === APIMethod.GET ? realParams : {},

    // Use json data in POST | PUT | DELETE
    data: method === APIMethod.GET ? {} : realParams,
  })

  return <Response>result.data
}
