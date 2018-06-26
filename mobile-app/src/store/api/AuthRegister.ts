import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { AuthRegister } from 'spec/api/auth'

export const POST = new API<
  AuthRegister.POST.params,
  AuthRegister.POST.response
>(APIMethod.POST, AuthRegister.path)

export default combineReducers({
  POST: POST.reducer,
})
