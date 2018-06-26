import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { AuthLoginEmail } from 'spec/api/auth'

export const POST = new API<
  AuthLoginEmail.POST.params,
  AuthLoginEmail.POST.response
>(APIMethod.POST, AuthLoginEmail.path)

export default combineReducers({
  POST: POST.reducer,
})
