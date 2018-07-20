/**
 * Utility for manipulating koa-path such as /user/:id/:action
 */

import * as PathToRegexp from 'path-to-regexp'

export function getPathParams<Params>(path: string): (keyof Params)[] {
  const keys = <PathToRegexp.Key[]>(
    PathToRegexp.parse(path).filter(t => typeof t !== 'string')
  )

  // Throw if any of the path params is wildcard
  if (keys.some(k => typeof k.name === 'number'))
    throw new Error('Only support path with param in :param format')

  return keys.map(k => <keyof Params>k.name)
}

export function populatePath(path: string, params: any = {}): string {
  return PathToRegexp.compile(path)(params)
}
