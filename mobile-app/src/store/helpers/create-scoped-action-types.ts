/**
 * Create map of actions, given action's names
 */

export default function createScopedActionTypes(
  scope: string,
  actions: string[]
): object {
  return actions.reduce(
    (map, action) => ({ ...map, [action]: `${scope}:${action}` }),
    {}
  )
}
