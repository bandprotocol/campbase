import * as React from 'react'
import Style from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { List, Modal, SearchBar } from 'antd-mobile-rn'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Color } from '~/utils'
import ColorButton from '~/components/ColorButton'
import ProductList from '~/components/ProductList'
import { Ionicons, Entypo } from '@expo/vector-icons'

import * as Product2ImageSrc from '~/assets/product-2.jpg'
import * as Product4ImageSrc from '~/assets/product-4.jpg'
import * as ProductQRSrc from '~/assets/product-qrcode.jpg'

const Title = Style.View`
  height: 40;
  width: 80;
  border-radius: 4;
  margin-right: 10;
  padding-horizontal: 10;
  justify-content: center;
`
const TitleText = Style.Text`
  font-size: 15;
  font-weight: 500;
`
const QRImage = Style.Image`
  aspect-ratio: 1;
  resize-mode: contain;
  margin-top: 10;
  width: 100%;
  height: null;
`

const mockProductList = [
  {
    id: 4,
    name: 'PALLADIUM × Bodyslam Sneakers (Men 8 - 11)',
    imageSrc: Product2ImageSrc,
    detail: 'Redeemed 3 days ago',
    claim_method: 'shipping',
    redeem: [
      {
        name: 'Date',
        value: '3 May 2018, 1:38 PM',
      },
      {
        name: 'Address',
        value:
          '126/178 Watcharapol rd., Taraeng, Bangkhen Bangkok, Thailand 10220',
      },
      {
        name: 'DHL Tracking',
        value: '#4847204575894',
      },
    ],
    extra: (
      <Ionicons
        name="ios-pin"
        size={24}
        color={Color.secondary}
        style={{ marginHorizontal: 10 }}
      />
    ),
  },
  {
    id: 3,
    name: 'Bodyslam 15 Year Concert | Premium Seat',
    imageSrc: Product4ImageSrc,
    detail: 'Redeemed 1 week ago',
    claim_method: 'qrscan',
    redeem: [
      {
        name: 'Date',
        value: '14 April 2018, 1:38 PM',
      },
      {
        name: 'QR Code',
        source: ProductQRSrc,
      },
    ],
    extra: (
      <Entypo
        name="ticket"
        size={24}
        color={Color.secondary}
        style={{ marginHorizontal: 10 }}
      />
    ),
  },
]

const ProductModal = ({ product, visible, onClose }) => (
  <Modal
    visible={visible}
    transparent
    maskClosable={true}
    onClose={onClose}
    title={product.name}
    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
  >
    <List style={{ marginTop: 20 }}>
      {product &&
        product.redeem &&
        product.redeem.map(item => (
          <List.Item
            key={item.name}
            onClick={() => false}
            thumb={
              item.name !== 'QR Code' && (
                <Title>
                  <TitleText>{item.name}</TitleText>
                </Title>
              )
            }
            multipleLine
          >
            {item.name === 'QR Code' ? (
              <QRImage key={item.name} source={item.source} />
            ) : (
              <Text>{item.value}</Text>
            )}
          </List.Item>
        ))}
    </List>
  </Modal>
)

export default class ProductListScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Bodyslam Receipts',
  }

  constructor(props) {
    super(props)
    this.state = {
      modalProduct: {},
      modalVisible: false,
    }
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  showModal(product) {
    this.setState({ modalVisible: true, modalProduct: product })
  }

  render() {
    const { navigation } = this.props
    const { modalProduct, modalVisible } = this.state

    return (
      <ScreenContainer darkBackground scrollable>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <ProductList
          list={mockProductList}
          onItemClick={item => this.showModal(item)}
        />
        <ProductModal
          product={modalProduct}
          visible={modalVisible}
          onClose={this.closeModal.bind(this)}
        />
      </ScreenContainer>
    )
  }
}
