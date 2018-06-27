import * as React from 'react'
import { PropTypes } from '~/declare'
import Style from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { Accordion, SearchBar } from 'antd-mobile-rn'
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
    detail: '24 Available via Official Store',
  },
  {
    id: 4,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 8 - 11)',
    imageSrc: Product2ImageSrc,
    detail: '3 Available via Official Store',
  },
  {
    id: 5,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 12 - 13)',
    imageSrc: Product2ImageSrc,
    detail: '14 Available via Marketplace',
  },
  {
    id: 6,
    name: 'Exclusive 5-day Trip to Chiangmai',
    imageSrc: Product3ImageSrc,
    detail: '2 Available via Marketplace',
  },
  {
    id: 1,
    name: 'Bodyslam 15 Year Concert | Basic Seat',
    imageSrc: Product4ImageSrc,
    detail: '153 Available via Official Store',
  },
  {
    id: 2,
    name: 'Bodyslam 15 Year Concert | Duo Seat',
    imageSrc: Product4ImageSrc,
    detail: '2 Available via Marketplace',
  },
  {
    id: 3,
    name: 'Bodyslam 15 Year Concert | Premium Seat',
    imageSrc: Product4ImageSrc,
    detail: '5 Available via Official Store',
  },
]

export default class ProductListScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    title: 'Bodyslam Products',
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer darkBackground scrollable>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <ProductList
          list={mockProductList}
          onItemClick={id => navigation.navigate('ProductInfo')}
        />
      </ScreenContainer>
    )
  }
}
