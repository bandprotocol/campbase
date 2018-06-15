import * as Koa from 'koa'

export function sendSuccess(
  ctx: Koa.Context,
  status: number = 200,
  data: Object = undefined
) {
  ctx.status = status
  ctx.body = { success: true, status, data }
}

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

export function checkBodyIncludesAllParams(
  ctx: Koa.Context,
  params: Array<string>
) {
  if (params.some(param => ctx.request.body[param] === undefined))
    throw new Exception(400, `Expect an object with ${params.join(', ')}`)
}
