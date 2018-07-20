/**
 * Utility for sending request to server
 */

import Axios, { AxiosError, AxiosInstance } from 'axios'
import { APIMethod, APIResponse } from 'spec/api/base'
import { SERVER_ENDPOINT } from '~/config'
import { getPathParams, populatePath } from '~/store/helpers/path'

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
  params: Params = <Params>{},
  jwt: string
): Promise<Response> {
  if (!axiosInstance) initializeQuery()

  // Calculate path to call (inject params to path)
  const url: string = populatePath(path, params)

  // Calculate real params
  const pathParams: (keyof Params)[] = getPathParams(path)
  const realParams: Partial<Params> = Object.assign(params, {})
  pathParams.forEach(p => delete realParams[p])

  // Format request
  const requestOpt = <any>{
    method,
    url,
    // User
    headers: jwt
      ? {
          Authorization: `Bearer ${jwt}`,
        }
      : {},
  }

  // Populate parameters
  if (method === APIMethod.GET) {
    requestOpt.params = realParams
  } else {
    requestOpt.data = realParams
  }

  try {
    // Make a call
    const axiosResponse = await axiosInstance.request(requestOpt)
    const axiosData = <APIResponse<Response>>axiosResponse.data

    return <Response>axiosData.data
  } catch (e) {
    if (e.response) {
      const axiosData = <APIResponse<Response>>e.response.data
      console.log('Query error', e.response)
      throw new QueryException(axiosData.status, <string>axiosData.error)
    } else throw e
  }
}
