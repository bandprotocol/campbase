import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { UserSignUp } from 'spec/api/user'

export const POST = new API<UserSignUp.POST.params, UserSignUp.POST.response>(
  APIMethod.POST,
  UserSignUp.path
)

export default combineReducers({
  POST: POST.reducer,
})
