import * as Koa from 'koa'
import { JWTUserInterface } from '~/common/jwt-user'

declare module 'koa' {
  interface Context {
    user?: JWTUserInterface
    success: (status?: number, data?: any) => void
    fail: (status?: number, message?: string) => void
    validate: {
      body: {
        includeParams: (params: string[]) => void
      }
    }
  }
}
