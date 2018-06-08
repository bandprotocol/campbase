import React from 'react'
import Style from 'styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import ColorButton from '~/components/ColorButton'
import { Color } from '~/utils'

import TitledList from '~/components/TitledList'

import PriceGraphSrc from '~/assets/price-graph.png'

const PriceGraph = Style.View`
  flex-direction: row;
  padding : 20px;
  background-color: #ffffff;
`
const PriceGraphImage = Style.Image`
  flex: 1;
  aspect-ratio: 1.5;
  resize-mode: contain;
`
const ButtonContainer = Style.View`
  flex-direction: row;
  padding: 20px;
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

export default class OfficialStoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Official Store',
  }

  render() {
    return (
      <ScreenContainer darkBackground noPadding>
        <TitledList list={mockListData} onItemClick={() => false} />
        <PriceGraph>
          <PriceGraphImage source={PriceGraphSrc} />
        </PriceGraph>
        <ButtonContainer>
          <ColorButton color={Color.green} style={{ flex: 1, margin: 5 }}>
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
