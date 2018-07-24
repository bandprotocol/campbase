import { Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default class Size {
  static statusBarHeight = Platform.select({
    ios: 0,
    android: 24,
  })

  static statusAndHeaderHeight = Platform.select({
    ios: 64,
    android: 80,
  })
}
