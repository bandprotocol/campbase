/**
 * Create map of actions, given action's names
 */

export function createScopedActionTypes(scope: string, actions: string[]): any {
  return actions.reduce(
    (map, action) => ({ ...map, [action]: `${scope}:${action}` }),
    {}
  )
}
