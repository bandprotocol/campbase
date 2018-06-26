import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { AuthRequestPin } from 'spec/api/auth'

export const POST = new API<
  AuthRequestPin.POST.params,
  AuthRequestPin.POST.response
>(APIMethod.POST, AuthRequestPin.path)

export default combineReducers({
  POST: POST.reducer,
})
