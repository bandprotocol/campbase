/**
 * Immutable data stucture for storing redux state
 */

import { Record } from 'immutable'

// Overload Record to support getter via key
declare module 'immutable' {
  export namespace Record {
    export interface TypedClass<T> extends Map<keyof T, T[keyof T]> {
      new (state?: T): any
    }
  }

  export function Record<T>(defaultValues: T): Record.TypedClass<T>
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

export type StateRecordType<S> = StateRecord<Record.TypedClass<S>, S>
