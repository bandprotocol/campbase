/**
 * Utility for manipulating koa-path such as /user/:id/:action
 */

import PathToRegexp, { Key } from 'path-to-regexp'

export function getPathParams<Params>(path: string): (keyof Params)[] {
  const keys = <Key[]>(
    PathToRegexp.parse(path).filter(t => typeof t !== 'string')
  )

  // Throw if any of the path params is wildcard
  if (keys.some(k => typeof k.name === 'number'))
    throw new Error('Only support path with param in :param format')

  return keys.map(k => <keyof Params>k.name)
}

export function populatePath<Params>(path: string, params: Params): string {
  return PathToRegexp.compile(path)(params)
}
