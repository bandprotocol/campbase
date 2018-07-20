import * as Koa from 'koa'
import { DBUsers, DBCommunityManagers } from 'spec/db'

declare module 'koa' {
  interface Context {
    user?: DBUsers
    cm?: DBCommunityManagers
    success: (status?: number, data?: any) => void
    fail: (status?: number, message?: string) => void
    validate: {
      body: {
        includeParams: (params: string[]) => void
      }
      isUser: Function
      isCM: Function
    }
  }
}
