/**
 * User!
 */

import { actionTypes } from './action'
import { createStateRecord } from '~/store'

const DefaultState = {
  id: 0,
  country_code: null,
  phone_number: null,
  email: null,
  email_activated: false,
  display_name: null,
  profile_image: null,
} as {
  id: number
  country_code: string
  phone_number: string
  email: string
  email_activated: boolean
  display_name: string
  profile_image: string
}

const StateRecord = createStateRecord(DefaultState)
type StateRecordType = typeof StateRecord

export default (
  state: StateRecordType = <StateRecordType>new StateRecord(),
  { type, payload }
): StateRecordType => {
  switch (type) {
    case actionTypes.SET_CURRENT_USER:
      return
      state
        .set('id', payload.id)
        .set('country_code', payload.country_code)
        .set('phone_number', payload.phone_number)
        .set('email', payload.email)
        .set('email_activated', payload.email_activated)
        .set('display_name', payload.display_name)
        .set('profile_image', payload.profile_image)

    default:
      return state
  }
}
