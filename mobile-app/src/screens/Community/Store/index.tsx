import * as React from 'react'
import { withNavigationProps } from '~/declare'
import Style from '~/styled-components'
import { Ionicons } from '@expo/vector-icons'
import ScreenContainer from '~/components/ScreenContainer'

import StakingTier from '~/components/StakingTier'
import PrettyProductList from '~/components/PrettyProductList'

import * as ProductImage1Src from '~/assets/product-1.jpg'
import * as ProductImage2Src from '~/assets/product-2.jpg'
import * as ProductImage3Src from '~/assets/product-3.jpg'
import * as ProductImage4Src from '~/assets/product-4.jpg'

const mockBestSellingProducts = [
  {
    id: 0,
    imageSrc: ProductImage1Src,
    name: 'Premium Membership Card',
    details: 'Fixed price @500 BST',
  },
  {
    id: 1,
    imageSrc: ProductImage2Src,
    name: 'PALLADIUM × Bodyslam Sneakers',
    details: 'Fixed price @300 USD',
  },
  {
    id: 2,
    imageSrc: ProductImage3Src,
    name: 'Exclusive 5-day Trip to Chiangmai',
    details: 'Dynamic Price @187.23 BST',
  },
  {
    id: 3,
    imageSrc: ProductImage4Src,
    name: 'Concert 15 Year Bodyslam Ticket',
    details: 'Dynamic Price @42.43 BST',
  },
]

export default class CommunityStoreScreen extends React.Component<
  withNavigationProps
> {
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
        <StakingTier navigation={navigation} />
        <PrettyProductList
          title={{
            text: 'Best Sellers',
            linkText: 'All Products',
            onLinkClick: () => navigation.navigate('ProductList'),
          }}
          list={mockBestSellingProducts}
          onItemClick={() => navigation.navigate('ProductDetailTab')}
        />
      </ScreenContainer>
    )
  }
}
