import * as Koa from 'koa'

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
  data: Object = undefined
) {
  ctx.status = status
  ctx.body = { success: true, status, data }
}

/**
 * Throws if not all the params are present in
 * context.request.body
 *
 * @param ctx Koa Context
 * @param params Array of params needed
 */
export function checkBodyIncludesAllParams(
  ctx: Koa.Context,
  params: Array<string>
) {
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

  toObject(): Object {
    return {
      status: this.status,
      error: this.message,
    }
  }
}
