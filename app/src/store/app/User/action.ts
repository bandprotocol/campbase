import { Alert } from 'react-native'
import {
  AsyncActionCreator,
  SyncActionCreator,
  createScopedActionTypes,
} from '~/store'

enum actions {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}
export const actionTypes = createScopedActionTypes('app.User', actions)

export const getCurrentUser: AsyncActionCreator<boolean> = () => async (
  dispatch,
  getState
) => {
  try {
    const user = {}

    dispatch({
      type: actionTypes.SET_CURRENT_USER,
      payload: user,
    })
    return true
  } catch (e) {
    // TODO: Display error
    Alert.alert('Error', 'Cannot get user info')
    return false
  }
}
