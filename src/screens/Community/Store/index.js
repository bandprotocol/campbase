import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import ScreenContainer from '~/components/ScreenContainer'

import StakingTier from '~/components/StakingTier'
import PrettyProductList from '~/components/PrettyProductList'

import ProductImage1Src from '~/assets/product-1.jpg'

const mockBestSellingProducts = [
  {
    id: 0,
    imageSrc: ProductImage1Src,
    name: 'Premium Membership Card',
    details: 'Fixed price @500 BST',
  },
  {
    id: 1,
    imageSrc: ProductImage1Src,
    name: 'PALLADIUM × Bodyslam Sneakers',
    details: 'Fixed price @300 USD',
  },
  {
    id: 2,
    imageSrc: ProductImage1Src,
    name: 'Exclusive 5-day Trip to Chiangmai',
    details: 'Dynamic Price @187.23 BST',
  },
  {
    id: 3,
    imageSrc: ProductImage1Src,
    name: 'Concert 15 Year Bodyslam Ticket',
    details: 'Dynamic Price @42.43 BST',
  },
]

export default class CommunityStoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Store',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={focused ? 'ios-cart' : 'ios-cart-outline'}
        color={tintColor}
        size={28}
      />
    ),
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer>
        <StakingTier />
        <PrettyProductList
          title={{
            text: 'Best Sellers',
            linkText: 'All Products',
            onLinkClick: () => false,
          }}
          list={mockBestSellingProducts}
          onItemClick={() => navigation.navigate('ProductDetailTab')}
        />
      </ScreenContainer>
    )
  }
}
