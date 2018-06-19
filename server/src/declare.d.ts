import * as Koa from 'koa'
import { DBUserInterface } from '~/common/jwt-user'

declare module 'koa' {
  interface Context {
    user?: DBUserInterface
    success: (status?: number, data?: object) => void
    fail: (status?: number, message?: string) => void
    validate: {
      body: {
        includeParams: (params: string[]) => void
      }
    }
  }
}
