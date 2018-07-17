import { createStateRecord } from '../helpers/state-record'

const DefaultState = {
  error: ''
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

const SigninReducer = (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
) => {
  switch (type) {
    case 'LOGIN':
      return state
        .set('error', 'TEST ERROR MESSAGE')
    default:
      return state
  }
}

export default SigninReducer
