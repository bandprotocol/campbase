import * as chai from 'chai'
import * as Koa from 'koa'
import { mockApplyMiddleware } from 'test/utils'
import { useValidateMethods } from '~/route/middlewares/validate-methods'
const should = chai.should()

describe('route:middlewares:validate-methods', () => {
  describe('fn:ctx.validate.body.includeParams', () => {
    it('should throw if not all params are included in context body', async () => {
      const ctx = {
        request: {
          body: {
            a: 1,
            b: 2,
            c: 3,
          },
        },
      } as Koa.Context

      mockApplyMiddleware(ctx, useValidateMethods)

      const requiredParams: string[] = ['a', 'b', 'c', 'd']

      const checkFn = () => ctx.validate.body.includeParams(requiredParams)
      checkFn.should.throw()
    })

    it('should not throw if all params are included in context body', async () => {
      const ctx = {
        request: {
          body: {
            a: 1,
            b: 2,
            c: 3,
          },
        },
      } as Koa.Context

      mockApplyMiddleware(ctx, useValidateMethods)

      const requiredParams: string[] = ['a', 'b', 'c']

      const checkFn = () => ctx.validate.body.includeParams(requiredParams)
      checkFn.should.not.throw()
    })
  })
})
