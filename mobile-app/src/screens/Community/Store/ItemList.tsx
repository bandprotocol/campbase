import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
import { Alert } from 'react-native'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { Accordion, Modal, SearchBar } from 'antd-mobile-rn'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Color } from '~/utils'
import ColorButton from '~/components/ColorButton'
import ProductList from '~/components/ProductList'

const Product1ImageSrc = require('~/assets/product-1.jpg')
const Product2ImageSrc = require('~/assets/product-2.jpg')
const Product3ImageSrc = require('~/assets/product-3.jpg')
const Product4ImageSrc = require('~/assets/product-4.jpg')

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

export default class ItemListScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    title: 'Your Bodyslam Items',
  }

  onItemClick(item) {
    const { navigation } = this.props

    Modal.operation([
      {
        text: 'View Product Detail',
        onPress: () => navigation.navigate('ProductInfo'),
      },
      {
        text: 'Redeem Product',
        onPress: () => {
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
        },
      },
      {
        text: 'Sell in Marketplace',
        onPress: () => navigation.navigate('Marketplace'),
      },
    ])
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer darkBackground scrollable>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <ProductList
          list={mockProductList}
          onItemClick={this.onItemClick.bind(this)}
        />
      </ScreenContainer>
    )
  }
}
