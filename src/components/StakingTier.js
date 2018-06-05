import React from 'react'
import Style from 'style-component'

import MedalSrc from '~/assets/medal.png'

const Container = Style.View`
  padding: 20;
  flex-direction: row;
  align-items: center;
  background: rgba(0,0,0,0.5);
`

const MedalImage = Style.Image`
  height: 60;
  margin-horizontal: 50;
`
const Info = Style.View`
  flex: 1;
`
const TierNameText = Style.Text`
  font-size: 24px;
`
const TierStakeText = Style.Text`
  font-weight: 300;
`
const UpgradeButton = Style.View`
  height: 40;
  width: 40;
  background: rgba(0,0,0,0.5);
  border-radius: 6;
  align-items: center;
  justify-content: center;
`

export default class StakingTier extends React.Component {
  render() {
    return (
      <Container>
        <MedalImage source={MedalSrc} />
      </Container>
    )
  }
}
