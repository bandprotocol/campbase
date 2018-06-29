import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
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
    id: 4,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 8 - 11)',
    imageSrc: Product2ImageSrc,
    detail: 'Buy @2.43 | Sell @3.19',
  },
  {
    id: 5,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 12 - 13)',
    imageSrc: Product2ImageSrc,
    detail: 'Buy @2.56 | Sell @3.11',
  },
  {
    id: 6,
    name: 'Exclusive 5-day Trip to Chiangmai',
    imageSrc: Product3ImageSrc,
    detail: 'Buy @34.54 | Sell @40.52',
  },
  {
    id: 1,
    name: 'Bodyslam 15 Year Concert | Basic Seat',
    imageSrc: Product4ImageSrc,
    detail: 'Buy @11.23 | Sell @12.48',
  },
  {
    id: 2,
    name: 'Bodyslam 15 Year Concert | Duo Seat',
    imageSrc: Product4ImageSrc,
    detail: 'Buy @28.93 | Sell @32.77',
  },
  {
    id: 3,
    name: 'Bodyslam 15 Year Concert | Premium Seat',
    imageSrc: Product4ImageSrc,
    detail: 'Buy @41.43 | Sell @42.48',
  },
]

export default class ProductListScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    title: 'Your Bodyslam Marketplace',
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer darkBackground scrollable>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <ProductList
          list={mockProductList}
          onItemClick={id => navigation.navigate('ProductMarketplace')}
        />
      </ScreenContainer>
    )
  }
}
