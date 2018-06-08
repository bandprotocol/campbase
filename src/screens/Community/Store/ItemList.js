import React from 'react'
import Style from 'styled-components'
import { Alert } from 'react-native'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { Accordion, SearchBar } from '~/antd'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Color } from '~/utils'
import ColorButton from '~/components/ColorButton'
import ProductList from '~/components/ProductList'

import Product1ImageSrc from '~/assets/product-1.jpg'
import Product2ImageSrc from '~/assets/product-2.jpg'
import Product3ImageSrc from '~/assets/product-3.jpg'
import Product4ImageSrc from '~/assets/product-4.jpg'

const mockProductList = [
  {
    id: 0,
    name: 'Premium Membership Card',
    imageSrc: Product1ImageSrc,
    detail: 'No expire',
  },
  {
    id: 4,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 8 - 11)',
    imageSrc: Product2ImageSrc,
    detail: 'Expire in 3 days',
  },
  {
    id: 6,
    name: 'Exclusive 5-day Trip to Chiangmai',
    imageSrc: Product3ImageSrc,
    detail: 'Expire in 2 weeks',
  },
  {
    id: 1,
    name: 'Bodyslam 15 Year Concert | Basic Seat',
    imageSrc: Product4ImageSrc,
    detail: 'Expire in 1 month',
  },
]

export default class ItemListScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Bodyslam Items',
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer darkBackground scrollable>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <ProductList
          list={mockProductList}
          onItemClick={item =>
            Alert.alert(
              'Product redemption',
              'Would you like to redeem this product?.',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    Alert.alert(
                      'Congratulations!',
                      'Your product has been redeemed.',
                      [
                        {
                          text: 'OK',
                          onPress: () => navigation.replace('ReceiptList'),
                        },
                      ],
                      { cancelable: false }
                    ),
                },
                { text: 'Cancel', style: 'cancel' },
              ]
            )
          }
        />
      </ScreenContainer>
    )
  }
}
