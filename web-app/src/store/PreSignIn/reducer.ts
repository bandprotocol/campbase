import { createStateRecord } from '../helpers/state-record'

const DefaultState = {
  error: '',
  registerSuccess: '',
  registerError: '',
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

const PreSigninReducer = (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
) => {
  switch (type) {
    case 'LOGIN_ATTEMPT':
    case 'REGISTER_ATTEMPT':
      state.set('registerError', '')
      return state.set('error', '')
    case 'LOGIN_FAILED':
      return state.set('error', 'TEST ERROR MESSAGE')
    case 'REGISTER_SUCCESSFUL':
      return state.set('registerSuccess', 'REGISTER SUCCESS')
    case 'REGISTER_FAILED':
      return state.set('registerError', 'REGISTER FAILED')
    default:
      return state
  }
}

export default PreSigninReducer
