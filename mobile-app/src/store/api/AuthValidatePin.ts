import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { AuthValidatePin } from 'spec/api/auth'

export const POST = new API<
  AuthValidatePin.POST.params,
  AuthValidatePin.POST.response
>(APIMethod.POST, AuthValidatePin.path)

export default combineReducers({
  POST: POST.reducer,
})
