import * as React from 'react'
import { withNavigationProps } from '~/declare'
import { Alert } from 'react-native'
import Style from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import ColorButton from '~/components/ColorButton'
import { Color } from '~/utils'

import TitledList from '~/components/TitledList'

const PriceGraphSrc = require('~/assets/price-graph.png')

const PriceGraph = Style.View`
  flex-direction: row;
  padding : 20px;
  background-color: #ffffff;
  margin-top: 5;
`
const PriceGraphImage = Style.Image`
  flex: 1;
  aspect-ratio: 1.5;
  resize-mode: contain;
`
const ButtonContainer = Style.View`
  flex-direction: row;
  padding: 10px;
`

const mockListData = [
  {
    title: 'Pricing',
    detail: 'Dynamic',
  },
  {
    title: 'Sellback',
    detail: 'Allow',
  },
  {
    title: 'Qty.',
    detail: '630',
  },
]

export default class OfficialStoreScreen extends React.Component<
  withNavigationProps
> {
  static navigationOptions = {
    tabBarLabel: 'Official Store',
  }

  onBuy() {
    const { navigation } = this.props

    Alert.alert(
      'Buy Product Token',
      'Are you sure you want to buy this product?',
      [
        {
          text: 'Yes',
          onPress: () =>
            Alert.alert(
              'Congratulations!',
              'Your have bought the product token at 0.314 BST.',
              [
                { text: 'Cancel' },
                {
                  text: 'View in Inventory',
                  onPress: () => navigation.navigate('ItemList'),
                },
              ]
            ),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  render() {
    return (
      <ScreenContainer darkBackground noPadding>
        <TitledList list={mockListData} onItemClick={() => false} />
        <PriceGraph>
          <PriceGraphImage source={PriceGraphSrc} />
        </PriceGraph>
        <ButtonContainer>
          <ColorButton
            onClick={this.onBuy.bind(this)}
            color={Color.green}
            style={{ flex: 1, margin: 5 }}
          >
            Buy @0.314 BST
          </ColorButton>
          <ColorButton color={Color.red} style={{ flex: 1, margin: 5 }}>
            Sell @0.308 BST
          </ColorButton>
        </ButtonContainer>
      </ScreenContainer>
    )
  }
}
