import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { AuthLoginPhone } from 'spec/api/auth'

export const POST = new API<
  AuthLoginPhone.POST.params,
  AuthLoginPhone.POST.response
>(APIMethod.POST, AuthLoginPhone.path)

export default combineReducers({
  POST: POST.reducer,
})
