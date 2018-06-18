import * as React from 'react'
import Style from '~/styled-components'
import { Ionicons } from '@expo/vector-icons'
import ColorButton from '~/components/ColorButton'
import { Color } from '~/utils'
import ScreenContainer from '~/components/ScreenContainer'

import IconList from '~/components/IconList'

const PricePanel = Style.View`
  padding: 20px 30px;
  background-color: ${Color.darkBackground};
`
const PriceText = Style.Text`
  font-size: 24px;
  margin-top: 5px;
  color: #ffffff;
`
const SubPriceText = Style.Text`
  font-size: 18px;
  line-height: 28;
  margin-bottom: 50;
  color: #ffffff;
`
const ButtonContainer = Style.View`
  flex-direction: row;
`

export default class CommunityInventoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Bodyslam Inventory',
  }

  render() {
    const { navigation } = this.props

    const services = [
      {
        name: 'Attention Tokens',
        details: '14 Tokens',
        iconName: 'ios-star',
        navigationPath: 'AttentionTokens',
      },
      {
        name: 'Community Marketplace',
        details: 'Trade items with other follower',
        iconName: 'ios-pricetags',
        navigationPath: 'MarketplaceList',
      },
      {
        name: 'Your Items',
        details: '10 Available',
        iconName: 'ios-nutrition',
        navigationPath: 'ItemList',
      },
      {
        name: 'Your Receipts',
        details: '34 Available',
        iconName: 'ios-paper',
        navigationPath: 'ReceiptList',
      },
      {
        name: 'Subscription',
        details: 'Stake your BST for discounts',
        iconName: 'ios-sync',
        navigationPath: 'Subscription',
      },
    ]

    return (
      <ScreenContainer>
        <PricePanel>
          <PriceText>732.28 BST</PriceText>
          <SubPriceText>34.54 USD Discount Available</SubPriceText>
          <ButtonContainer>
            <ColorButton color={Color.green} style={{ flex: 1, margin: 5 }}>
              Buy @0.893
            </ColorButton>
            <ColorButton color={Color.red} style={{ flex: 1, margin: 5 }}>
              Sell @0.890
            </ColorButton>
          </ButtonContainer>
        </PricePanel>
        <IconList
          list={services}
          onItemClick={item =>
            item.navigationPath && navigation.navigate(item.navigationPath)
          }
        />
      </ScreenContainer>
    )
  }
}
