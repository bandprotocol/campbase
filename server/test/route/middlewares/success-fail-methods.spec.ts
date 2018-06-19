import * as chai from 'chai'
import * as Koa from 'koa'
import { mockApplyMiddleware } from 'test/utils'
import {
  RouteException,
  useSuccessFailMethods,
} from '~/route/middlewares/success-fail-methods'

const should = chai.should()

describe('route:middlewares:success-fail-methods', () => {
  describe('fn:ctx.success', () => {
    it('should populate context with statusCode 200 by default', async () => {
      const ctx = {} as Koa.Context
      mockApplyMiddleware(ctx, useSuccessFailMethods)

      ctx.success()
      ctx.should.contain({ status: 200 })
    })

    it('should populate context with statusCode and data', async () => {
      const ctx = {} as Koa.Context
      mockApplyMiddleware(ctx, useSuccessFailMethods)

      const status = 201
      const data = { a: 1, b: 2 }

      ctx.success(status, data)
      ctx.should.contain({ status })
      ctx.body.should.contain({ data })
    })
  })

  describe('fn:ctx.fail', () => {
    it('should throws a RouteException with statusCode 400 by default', async () => {
      const ctx = {} as Koa.Context
      mockApplyMiddleware(ctx, useSuccessFailMethods)

      const checkFn = () => ctx.fail()
      checkFn.should
        .throws()
        .that.is.an.instanceof(RouteException)
        .that.has.nested.property('responseBody.status', 400)
      // ctx.should.contain({ status: 400 })
      // ctx.body.should.contain({ status: 400 })
    })

    it('should  throws a RouteException with statusCode and error message', async () => {
      const ctx = {} as Koa.Context
      mockApplyMiddleware(ctx, useSuccessFailMethods)

      const status = 404
      const errorMessage = 'Important Error!'

      const checkFn = () => ctx.fail(status, errorMessage)
      checkFn.should
        .throw()
        .that.is.an.instanceof(RouteException)
        .that.has.property('responseBody')
        .that.include({ status, error: errorMessage })

      // ctx.should.contain({ status })
      // ctx.body.should.contain({ status, error: errorMessage })
    })
  })
})
