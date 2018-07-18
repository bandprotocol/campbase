import { createStateRecord } from '~/store/helpers/state-record'

enum alertLevel {
  info = 'info',
  success = 'success',
  error = 'error',
}

const DefaultState = {
  alertMessage: {
    type: alertLevel.info,
    message: '',
  },
  currentTabKey: '0',
} as {
  alertMessage: {
    type: alertLevel
    message: string
  }
  currentTabKey: string
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

const PreSigninReducer = (
  state: StateRecordType = new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case 'api:/auth/cm/v1/login:FETCH':
    case 'REGISTER_ATTEMPT':
      console.log('fetching...')
      return state.set('alertMessage', DefaultState.alertMessage)
    case 'LOGIN_FAILED':
      return state.set('alertMessage', {
        type: alertLevel.error,
        message:
          payload.message ||
          'Something wrong with login, please contact admin.',
      })
    case 'REGISTER_SUCCESSFUL':
      return state
        .set('alertMessage', {
          type: alertLevel.success,
          message: 'Register successful, Please check you e-mail.',
        })
        .set('currentTabKey', '0')
    case 'REGISTER_FAILED':
      return state.set('alertMessage', {
        type: alertLevel.error,
        message: 'Register failed.',
      })
    case 'CHANGE_TAB':
      return state.set('currentTabKey', payload.changeToTab)
    default:
      return state
  }
}

export default PreSigninReducer
