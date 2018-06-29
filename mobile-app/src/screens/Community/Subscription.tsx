import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
import { Alert } from 'react-native'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { Accordion } from 'antd-mobile-rn'
import StakingTier from '~/components/StakingTier'
import HeaderButton from '~/components/HeaderButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Color } from '~/utils'
import ColorButton from '~/components/ColorButton'

const Tiers = Styled.View`
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 8;
`

const TierDetail = Styled.View`
  padding: 10px 20px;
  flex-direction: row;
`
const TierDescription = Styled.Text`
  flex: 1;
`

export default class SubscriptionScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    title: 'Subscription',
    headerRight: (
      <HeaderButton
        content={
          <MaterialCommunityIcons
            name="tag-remove"
            size={28}
            color={Color.primary}
          />
        }
        onClick={() =>
          Alert.alert(
            'Sorry, you cannot cancel your subscription right now.',
            'Please try again later.'
          )
        }
      />
    ),
  }

  render() {
    return (
      <ScreenContainer scrollable darkBackground>
        <StakingTier noUpgrade />
        <Tiers>
          <Accordion defaultActiveKey="2">
            <Accordion.Panel header="Broze Tier">
              <TierDetail>
                <TierDescription>1,000 BST Required</TierDescription>
              </TierDetail>
            </Accordion.Panel>
            <Accordion.Panel header="Silver Tier">
              <TierDetail>
                <TierDescription>5,000 BST Required</TierDescription>
              </TierDetail>
            </Accordion.Panel>
            <Accordion.Panel header="Gold Tier">
              <TierDetail>
                <TierDescription>15,000 BST Required</TierDescription>
                <ColorButton color={Color.primary} size="small">
                  Subscribed
                </ColorButton>
              </TierDetail>
            </Accordion.Panel>
            <Accordion.Panel header="Platinum Tier">
              <TierDetail>
                <TierDescription>75,000 BST Required</TierDescription>
                <ColorButton color={Color.green} size="small">
                  Subscribe
                </ColorButton>
              </TierDetail>
            </Accordion.Panel>
            <Accordion.Panel header="Ultimate Tier">
              <TierDetail>
                <TierDescription>500,000 BST Required</TierDescription>
                <ColorButton color={Color.red} size="small">
                  Insufficient BST
                </ColorButton>
              </TierDetail>
            </Accordion.Panel>
          </Accordion>
        </Tiers>
      </ScreenContainer>
    )
  }
}
