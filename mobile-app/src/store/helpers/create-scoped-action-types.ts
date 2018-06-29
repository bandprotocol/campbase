/**
 * Create map of actions, given action's names
 */

export function createScopedActionTypes<T>(
  scope: string,
  actions: T
): { [k in keyof T]: string } {
  return <{ [k in keyof T]: string }>Object.keys(actions).reduce(
    (map, key) =>
      Object.assign(map, {
        [key]: `${scope}:${actions[key]}`,
      }),
    {}
  )
}
