import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { Color, Size } from '~/utils'

interface ScreenContainerProps {
  darkBackground?: boolean
  scrollable?: boolean
  noPadding?: boolean
  backgroundColor?: string
  children
}

export default class ScreenContainer extends React.Component<
  ScreenContainerProps
> {
  render() {
    const {
      darkBackground,
      backgroundColor,
      scrollable,
      children,
      noPadding,
    } = this.props

    const Component = scrollable ? ScrollView : View
    const bg =
      backgroundColor || (darkBackground ? Color.paleBackground : '#ffffff')

    const props = scrollable
      ? {
          contentContainerStyle: {
            backgroundColor: bg,
            paddingTop: noPadding ? 0 : Size.statusAndHeaderHeight,
          },
          style: { flex: 1, backgroundColor: bg },
        }
      : {
          style: {
            flex: 1,
            paddingTop: noPadding ? 0 : Size.statusAndHeaderHeight,
            backgroundColor: bg,
          },
        }

    return <Component {...props}>{children}</Component>
  }
}
