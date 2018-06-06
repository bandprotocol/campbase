import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'

import IconList from '~/components/IconList'

const Container = Style.View``

const services = [
  {
    name: 'Community Marketplace',
    details: 'Trade items with other follower',
    iconName: 'ios-pricetags',
  },
  {
    name: 'Items',
    details: '10 Available',
    iconName: 'ios-nutrition',
  },
  {
    name: 'Receipts',
    details: '34 Available',
    iconName: 'ios-paper',
  },
  {
    name: 'Subscription',
    details: 'Stake your BST for discounts',
    iconName: 'ios-sync',
  },
]

export default class CommunityInventoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Bodyslam Inventory',
  }

  render() {
    return (
      <Container>
        <IconList list={services} onItemClick={() => false} />
      </Container>
    )
  }
}
