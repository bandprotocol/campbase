import React from 'react'
import Style from 'styled-components'
import ScreenContainer from '~/components/ScreenContainer'

import TitledList from '~/components/TitledList'

import ImageSrc from '~/assets/concert.jpg'

const Image = Style.Image`
  height: 240;
  width: 100%;
`

const Description = Style.View`
  padding: 20px;
  background-color: #ffffff;
`
const DescriptionText = Style.Text``

const mockDescription =
  'In 2015 Bodyslam was given the award, Seed award of the year (Rock) from Seed Radio, And they show a concert with Carabao band (famous music band in Thailand). On 19 July 2015 Bodyslam released a new single " Wala Tao Nun " ( เวลาเท่านั้น Time Only ) is mean " everything will have the answer by time ".'

export default class ProductInfoScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Product Info',
  }

  render() {
    return (
      <ScreenContainer darkBackground noPadding>
        <Image source={ImageSrc} />
        <Description>
          <DescriptionText>{mockDescription}</DescriptionText>
        </Description>
        <TitledList
          list={[
            {
              title: 'Redeem',
              detail: 'QR Scan',
            },
          ]}
          onItemClick={() => false}
        />
      </ScreenContainer>
    )
  }
}
