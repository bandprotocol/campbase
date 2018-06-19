import * as Koa from 'koa'

export function useValidateMethods(app: Koa) {
  // Populate ctx with validations
  app.use(async (ctx, next) => {
    function includeParams(params: string[]) {
      if (
        !ctx.request.body ||
        params.some(param => ctx.request.body[param] === undefined)
      )
        ctx.fail(400, `Expect an object with ${params.join(', ')}`)
    }

    ctx.validate = {
      body: {
        includeParams,
      },
    }

    return next()
  })
}
