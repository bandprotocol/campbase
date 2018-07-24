import * as React from 'react'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

declare module '*.png'
declare module '*.jpg'

declare namespace PropTypes {
  export interface withNavigation {
    navigationOptions?: object
    navigation?: NavigationScreenProp<NavigationState>
  }

  export interface withDrawer {
    activeItemKey?
  }
}
