import * as React from 'react'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

declare module '*.png'
declare module '*.jpg'

export interface withNavigationProps {
  navigation?: NavigationScreenProp<NavigationState>
}

export interface withDraweProps {
  activeItemKey?
}
