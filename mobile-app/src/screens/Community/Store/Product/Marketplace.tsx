import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import ColorButton from '~/components/ColorButton'
import { Color } from '~/utils'

import TitledList from '~/components/TitledList'

const PriceGraphSrc = require('~/assets/price-graph.png')

const PriceGraph = Styled.View`
  flex-direction: row;
  padding : 20px;
  background-color: #ffffff;
`
const PriceGraphImage = Styled.Image`
  flex: 1;
  aspect-ratio: 1.5;
  resize-mode: contain;
`
const ButtonContainer = Styled.View`
  flex-direction: row;
  padding: 10px;
`

const MarketOrders = Styled.View`
  flex: 1;
  margin-top: 5;
  background-color: #ffffff;
  flex-direction: row;
  overflow: hidden;
`
const MarketColumn = Styled.View`
  flex: 1;
  align-items: center;
  padding: 5px;
`
const MarketColumnHeader = Styled.Text`
  color: ${p => p.color};
  font-size: 16;
  font-weight: bold;
  margin-top: 10;
  margin-bottom: 15;
`
const MarketColumnSeparator = Styled.View`
  background-color: ${Color.paleBackground};
  width: 2;
  height: 100%;
`
const Order = Styled.TouchableOpacity`
  margin-bottom: 5;
  margin-horizontal: 10;
  padding: 7px;
  border-radius: 5;
  background-color: ${p => (p.buy ? Color.paleGreen : Color.paleRed)};
  width: 90%;
  align-items: center;
`
const OrderText = Styled.Text``

const mockBuyOrders = ['0.313', '0.310', '0.307', '0.307', '0.302', '0.296']
const mockSellOrders = ['0.321', '0.322', '0.325', '0.328', '0.333']

export default class MarketplaceScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    tabBarLabel: 'Marketplace',
  }

  render() {
    return (
      <ScreenContainer darkBackground noPadding>
        <PriceGraph>
          <PriceGraphImage source={PriceGraphSrc} />
        </PriceGraph>

        <MarketOrders>
          <MarketColumn>
            <MarketColumnHeader color={Color.green}>
              Buy Orders
            </MarketColumnHeader>
            {mockBuyOrders.map((price, i) => (
              <Order buy key={i}>
                <OrderText>{price}</OrderText>
              </Order>
            ))}
          </MarketColumn>
          <MarketColumnSeparator />
          <MarketColumn>
            <MarketColumnHeader color={Color.red}>
              Sell Orders
            </MarketColumnHeader>
            {mockSellOrders.map((price, i) => (
              <Order sell key={i}>
                <OrderText>{price}</OrderText>
              </Order>
            ))}
          </MarketColumn>
        </MarketOrders>

        <ButtonContainer>
          <ColorButton color={Color.green} style={{ flex: 1, margin: 5 }}>
            Buy
          </ColorButton>
          <ColorButton color={Color.red} style={{ flex: 1, margin: 5 }}>
            Sell
          </ColorButton>
        </ButtonContainer>
      </ScreenContainer>
    )
  }
}
