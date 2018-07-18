import * as Koa from 'koa'
import * as sinon from 'sinon'
import { JWTUser, JWTUserInterface } from '~/common/jwt-user'
import {
  JWTCommunityManager,
  JWTCommunityManagerInterface,
} from '~/common/jwt-cm'
import { signJWT } from '~/common/jwt'

export function mockModule<T>(
  moduleToMock: T,
  defaultMockValuesForMock: Partial<{ [K in keyof T]: T[K] }>
) {
  return (
    sandbox: sinon.SinonSandbox,
    returnOverrides?: Partial<{ [K in keyof T]: T[K] }>
  ): void => {
    const functions = Object.keys(moduleToMock) as (keyof T)[]
    const returns = returnOverrides || {}
    functions.forEach((f: keyof T) => {
      sandbox
        .stub(moduleToMock, f)
        .callsFake((returns[f] as any) || defaultMockValuesForMock[f])
    })
  }
}

export function mockApplyMiddleware(
  ctx: Koa.Context,
  middleware: (app: Koa) => void
) {
  const app = {
    use: middleware => middleware(ctx, async () => false),
  } as Koa

  middleware(app)
}

export function createUserAuthorizationHeader(user: JWTUserInterface) {
  const jwtUser = new JWTUser(user.id, user.country_code, user.phone_number)
  return `Bearer ${signJWT(jwtUser)}`
}

export function createCMAuthorizationHeader(cm: JWTCommunityManagerInterface) {
  const jwtCM = new JWTCommunityManager(cm.id, cm.username, cm.email)
  return `Bearer ${signJWT(jwtCM)}`
}
