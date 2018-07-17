import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { UserMe } from 'spec/api/client/user'

export const GET = new API<UserMe.GET.params, UserMe.GET.response>(
  'UserMe',
  APIMethod.GET,
  UserMe.path
)

export default combineReducers({
  GET: GET.reducer,
})
