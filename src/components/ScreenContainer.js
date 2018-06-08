import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import { Color, Size } from '~/utils'

export default class ScreenContainer extends React.Component {
  static propTypes = {
    darkBackground: PropTypes.bool,
    scrollable: PropTypes.bool,
  }

  render() {
    const { darkBackground, scrollable, children, noPadding } = this.props

    const Component = scrollable ? ScrollView : View
    const backgroundColor = darkBackground ? Color.paleBackground : '#ffffff'

    const props = scrollable
      ? {
          contentContainerStyle: {
            backgroundColor,
            paddingTop: noPadding ? 0 : Size.statusAndHeaderHeight,
          },
          style: { flex: 1, backgroundColor },
        }
      : {
          style: {
            flex: 1,
            paddingTop: noPadding ? 0 : Size.statusAndHeaderHeight,
            backgroundColor,
          },
        }

    return <Component {...props}>{children}</Component>
  }
}
