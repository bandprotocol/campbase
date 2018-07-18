import { createStateRecord } from '~/store/helpers/state-record'

const DefaultState = {} as {}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

const RegisterReducer = (
  state: StateRecordType = new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    default:
      return state
  }
}

export default RegisterReducer
