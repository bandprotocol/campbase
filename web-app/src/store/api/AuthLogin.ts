import { combineReducers } from 'redux'
import { APIMethod } from 'spec/api/base'
import { AuthLogin } from 'spec/api/cm/auth'
import { API } from '~/store/helpers/api'

export const POST = new API<AuthLogin.POST.params, AuthLogin.POST.response>(
  'AuthLogin',
  APIMethod.POST,
  AuthLogin.path
)

export default combineReducers({
  POST: POST.reducer,
})
