import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { UserMe } from 'spec/api/user'

export const GET = new API<UserMe.GET.params, UserMe.GET.response>(
  APIMethod.GET,
  UserMe.path
)

export default combineReducers({
  GET: GET.reducer,
})
