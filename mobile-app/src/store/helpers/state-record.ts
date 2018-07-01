/**
 * Immutable data stucture for storing redux state
 */

import { Record } from 'immutable'

// Overload Record to support getter via key
declare module 'immutable' {
  export namespace Record {
    export interface ClassWithType<T, K extends keyof T> extends Map<K, T[K]> {
      new (state?: T): any
    }
  }

  export function Record<T, K extends keyof T>(
    defaultValues: T
  ): Record.ClassWithType<T, K>
}

type StateRecord<R, S> = {
  new (state?: S): R & S
  set: (key: keyof S, value: S[keyof S]) => R & S
  remove: (key: keyof S) => R & S
} & S

export const createStateRecord = <S>(DefaultState: S) => {
  const TypeInjector = <R>(cls: new (state?: S) => R): StateRecord<R, S> =>
    <StateRecord<R, S>>cls
  return TypeInjector(Record(DefaultState))
}
