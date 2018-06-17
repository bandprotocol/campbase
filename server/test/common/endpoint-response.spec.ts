import * as chai from 'chai'
import * as Koa from 'koa'

import {
  sendSuccess,
  checkBodyIncludesAllParams,
  Exception,
} from '~/common/endpoint-response'

const should = chai.should()

describe('common:endpoint-response', () => {
  describe('fn:sendSuccess', () => {
    it('should populate context with statusCode 200 by default', async () => {
      const ctx = {} as Koa.Context
      sendSuccess(ctx)
      ctx.should.contain({ status: 200 })
    })

    it('should populate context with statusCode and data', async () => {
      const ctx = {} as Koa.Context
      const status = 201
      const data = { a: 1, b: 2 }

      sendSuccess(ctx, status, data)

      ctx.should.contain({ status })
      ctx.body.should.contain({ data })
    })
  })

  describe('fn:checkBodyIncludesAllParams', () => {
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
      const requiredParams: string[] = ['a', 'b', 'c', 'd']

      const checkFn = () => checkBodyIncludesAllParams(ctx, requiredParams)
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
      const requiredParams: string[] = ['a', 'b', 'c']

      const checkFn = () => checkBodyIncludesAllParams(ctx, requiredParams)
      checkFn.should.not.throw()
    })
  })

  describe('class:Exception', () => {
    it('should be throwable and encapsulating the error message', async () => {
      const status = 400
      const errorMessage = 'Important Error!'

      const instance = new Exception(status, errorMessage)
      instance.should.be.an
        .instanceof(Error)
        .with.property('message', errorMessage)
    })

    it('should be expose status and message via toObject method', async () => {
      const status = 400
      const errorMessage = 'Important Error!'

      const instance = new Exception(status, errorMessage)
      instance.getBody().should.contains({
        success: false,
        status,
        error: errorMessage,
      })
    })
  })
})
