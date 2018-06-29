import * as Koa from 'koa'
import { DBUserInterface } from 'common/jwt-user'

export interface Request<Params> extends Koa.Request {
  body: Params
}

export interface Context<Params, Response> extends Koa.Context {
  request: Request<Params>
  success: (status?: number, data?: Response) => void
  user: DBUserInterface
}
