import * as sinon from 'sinon'

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