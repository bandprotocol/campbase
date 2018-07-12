import * as Koa from 'koa'
import { APIResponseStatus as Status, APIResponse } from 'spec/api/base'

/**
 * An exception to be thrown when things go wrong
 */
export class RouteException extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }

  get responseBody(): APIResponse {
    return {
      success: false,
      status: this.status,
      error: this.message,
    }
  }
}

export function useSuccessFailMethods(app: Koa) {
  app.use(async (ctx, next) => {
    try {
      // Set ctx.success
      ctx.success = (status: number = 200, data: object = undefined) => {
        ctx.status = status
        ctx.body = <APIResponse>{ success: true, status, data }
      }

      // Set ctx.fail
      ctx.fail = (status: number = 400, message: string) => {
        throw new RouteException(status, message)
      }

      await next()
    } catch (err) {
      if (err instanceof RouteException) {
        ctx.body = err.responseBody
        ctx.status = err.status
      } else {
        // TODO: Write error log somewhere
        console.error(err, ctx.request)

        ctx.status = Status.INTERNAL_SERVER_ERROR
        ctx.body = {
          status: Status.INTERNAL_SERVER_ERROR,
          error: 'Unexpected error. Please contact dev@campbase.co',
        }
      }
    }
  })
}
