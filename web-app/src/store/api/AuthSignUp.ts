import { combineReducers } from 'redux'
import { APIMethod } from '~/spec/api/base'
import { AuthSignUp } from '~/spec/api/cm/auth'
import { API } from '~/store/helpers/api'

export const POST = new API<any, any>(
  'AuthSignUp',
  APIMethod.POST,
  AuthSignUp.path
)

export default combineReducers({
  POST: POST.reducer,
})
