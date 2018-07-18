import { createStateRecord } from '~/store/helpers/state-record'

const DefaultState = {
  currentStep: 0,
} as {
  currentStep: number
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

const RegisterReducer = (
  state: StateRecordType = new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case 'CHANGE_STEP':
      return state.set('currentStep', payload.toStep)
    default:
      return state
  }
}

export default RegisterReducer
