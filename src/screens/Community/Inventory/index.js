import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '~/antd'
import Color from '~/color'
import ScreenContainer from '~/components/ScreenContainer'

import IconList from '~/components/IconList'

const PricePanel = Style.View`
  padding: 20px 30px;
  background-color: rgba(0,0,0,0.5)
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
      <ScreenContainer>
        <PricePanel>
          <PriceText>732.28 BST</PriceText>
          <SubPriceText>34.54 USD Discount Available</SubPriceText>
          <ButtonContainer>
            <Button
              type="primary"
              style={{ backgroundColor: Color.primary, flex: 1, margin: 5 }}
            >
              Buy @0.893
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: Color.primary, flex: 1, margin: 5 }}
            >
              Sell @0.890
            </Button>
          </ButtonContainer>
        </PricePanel>
        <IconList list={services} onItemClick={() => false} />
      </ScreenContainer>
    )
  }
}
