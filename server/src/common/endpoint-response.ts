import * as Koa from 'koa'

/**
 * Data in Koa.Context.body
 */
export interface EndpointBodyInterface {
  success: boolean
  status: number
  data?: object
  error?: string
}

/**
 * Populate context with success status and
 * standardized data format
 *
 * @param ctx Koa Context
 * @param status HTTP Success status
 * @param data Object being returned
 */
export function sendSuccess(
  ctx: Koa.Context,
  status: number = 200,
  data: object = undefined
) {
  ctx.status = status
  ctx.body = <EndpointBodyInterface>{ success: true, status, data }
}

/**
 * Throws if not all the params are present in
 * context.request.body
 *
 * @param ctx Koa Context
 * @param params Array of params required
 */
export function checkBodyIncludesAllParams(ctx: Koa.Context, params: string[]) {
  if (params.some(param => ctx.request.body[param] === undefined))
    throw new Exception(400, `Expect an object with ${params.join(', ')}`)
}

/**
 * An exception to be thrown in route definitions
 */
export class Exception extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }

  getBody(): EndpointBodyInterface {
    return {
      success: false,
      status: this.status,
      error: this.message,
    }
  }
}
