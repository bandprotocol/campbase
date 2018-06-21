/**
 * Proxy router class to facilitate type-checking on params and responses
 */

import * as Router from 'koa-router'
import { Context } from '~/route/interfaces'

export default class ResourceRouter {
  private router: Router

  constructor() {
    this.router = new Router()
  }

  get<P, R>(
    path: string,
    handler: (ctx: Context<P, R>, next: () => Promise<any>) => any
  ) {
    return this.router.get(path, handler)
  }

  post<P, R>(
    path: string,
    handler: (ctx: Context<P, R>, next: () => Promise<any>) => any
  ) {
    return this.router.post(path, handler)
  }

  put<P, R>(
    path: string,
    handler: (ctx: Context<P, R>, next: () => Promise<any>) => any
  ) {
    return this.router.put(path, handler)
  }

  del<P, R>(
    path: string,
    handler: (ctx: Context<P, R>, next: () => Promise<any>) => any
  ) {
    return this.router.del(path, handler)
  }

  routes() {
    return this.router.routes()
  }
}
