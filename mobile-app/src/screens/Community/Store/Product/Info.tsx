import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'

import TitledList from '~/components/TitledList'

const ImageSrc = require('~/assets/concert.jpg')

const Image = Styled.Image`
  height: 240;
  width: 100%;
`

const Description = Styled.View`
  padding: 20px;
  background-color: #ffffff;
  margin-top: 5;
`
const DescriptionText = Styled.Text``

const mockDescription =
  'In 2015 Bodyslam was given the award, Seed award of the year (Rock) from Seed Radio, And they show a concert with Carabao band (famous music band in Thailand). On 19 July 2015 Bodyslam released a new single " Wala Tao Nun " ( เวลาเท่านั้น Time Only ) is mean " everything will have the answer by time ".'

export default class ProductInfoScreen extends React.Component<
  PropTypes.withNavigation
> {
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
              detail: 'via QR Scan',
            },
            {
              title: 'Expire',
              detail: '12 September 2018, 10:00 PM',
            },
          ]}
          onItemClick={() => false}
        />
      </ScreenContainer>
    )
  }
}
