import * as React from 'react'
import Style from '~/styled-components'
import { Ionicons } from '@expo/vector-icons'
import { Color } from '~/utils'

const MedalSrc = require('~/assets/medal.png')

const Container = Style.View`
  padding: 15px 30px;
  flex-direction: row;
  align-items: center;
  background: ${Color.primary};
`

const MedalImage = Style.Image`
  height: 46;
  flex: 0;
  flexBasis: 46;
  margin-right: 10;
  resize-mode: contain;
`
const Info = Style.View`
  flex: 1;
`
const TierNameText = Style.Text`
  font-size: 20px;
  color: #ffffff;
`
const TierStakeText = Style.Text`
  font-weight: 300;
  line-height: 22;
  color: #ffffff;
`
const UpgradeButton = Style.TouchableOpacity`
  height: 40;
  width: 40;
  background: rgba(0,0,0,0.5);
  border-radius: 6;
  align-items: center;
  justify-content: center;
`

interface StakingTierProps {
  navigation
  noUpgrade: boolean
}

export default class StakingTier extends React.Component<StakingTierProps> {
  render() {
    const { navigation, noUpgrade } = this.props

    return (
      <Container>
        <MedalImage source={MedalSrc} />
        <Info>
          <TierNameText>Gold Tier</TierNameText>
          <TierStakeText>15,000 BST Staked</TierStakeText>
        </Info>
        {!noUpgrade && (
          <UpgradeButton onPress={() => navigation.navigate('Subscription')}>
            <Ionicons name="md-arrow-round-up" size={24} color="#ffffff" />
          </UpgradeButton>
        )}
      </Container>
    )
  }
}
