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
