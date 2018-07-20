import { APIResponseStatus as Status } from 'spec/api/base'
import * as Koa from 'koa'
export function useValidateMethods(app: Koa) {
  // Populate ctx with validations
  app.use(async (ctx, next) => {
    function includeParams(params: string[]) {
      const key = { POST: 'body', GET: 'query' }[ctx.method]
      if (
        !ctx.request[key] ||
        params.some(param => ctx.request[key][param] === undefined)
      )
        ctx.fail(
          Status.BAD_REQUEST,
          `Expect an object with ${params.join(', ')}`
        )
    }

    function isUser() {
      if (!ctx.user) ctx.fail(Status.UNAUTHORIZED)
    }

    function isCM() {
      if (!ctx.cm) ctx.fail(Status.UNAUTHORIZED)
    }

    ctx.validate = {
      body: {
        includeParams,
      },
      isUser,
      isCM,
    }

    return next()
  })
}
