import { combineReducers } from 'redux'
import { API } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import { Wallets } from 'spec/api/resources/wallets'

export const POST = new API<Wallets.POST.params, Wallets.POST.response>(
  'Wallets',
  APIMethod.POST,
  Wallets.path
)

export default combineReducers({
  POST: POST.reducer,
})
