import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { UserWallets } from 'spec/api/client/user'

export const GET = new API<UserWallets.GET.params, UserWallets.GET.response>(
  'UserWallets',
  APIMethod.GET,
  UserWallets.path
)

export default combineReducers({
  GET: GET.reducer,
})
