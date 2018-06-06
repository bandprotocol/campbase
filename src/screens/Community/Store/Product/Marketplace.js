import React from 'react'
import Style from 'styled-components'

const Container = Style.View``

export default class MarketplaceScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Marketplace',
  }

  render() {
    return <Container />
  }
}
