import React from 'react'
import Style from 'styled-components'
import ScreenContainer from '~/components/ScreenContainer'

export default class MarketplaceScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Marketplace',
  }

  render() {
    return <ScreenContainer darkBackground noPadding />
  }
}
