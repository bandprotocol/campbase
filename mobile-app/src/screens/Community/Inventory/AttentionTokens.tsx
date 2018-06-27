import * as React from 'react'
import { PropTypes } from '~/declare'
import Style from '~/styled-components'
import { Alert } from 'react-native'
import ScreenContainer from '~/components/ScreenContainer'
import { Text } from 'react-native'
import { Accordion } from 'antd-mobile-rn'
import StakingTier from '~/components/StakingTier'
import HeaderButton from '~/components/HeaderButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Color } from '~/utils'
import ColorButton from '~/components/ColorButton'
import { Ionicons } from '@expo/vector-icons'

const Packages = Style.View`
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 8;
`

const PackageDetail = Style.View`
  padding: 10px 20px;
  flex-direction: row;
`
const PackageDescription = Style.Text`
  flex: 1;
`

const PossesedTokens = Style.View`
  padding: 15px 30px;
  flex-direction: row;
  align-items: center;
  background: ${Color.primary};
`
const Info = Style.View`
  flex: 1;
  margin-left: 20;
`
const AmountText = Style.Text`
  font-size: 20px;
  color: #ffffff;
`
const DescriptionText = Style.Text`
  font-weight: 300;
  line-height: 22;
  color: #ffffff;
`
export default class AttentionTokensScreen extends React.Component<
  PropTypes.withNavigation
> {
  static navigationOptions = {
    title: 'Attention Tokens',
    tintColor: Color.secondary,
  }

  render() {
    return (
      <ScreenContainer scrollable darkBackground>
        <PossesedTokens>
          <Ionicons name="ios-star" size={36} color="#ffffff" />
          <Info>
            <AmountText>14 Tokens</AmountText>
            <DescriptionText>Make your voice heard</DescriptionText>
          </Info>
        </PossesedTokens>
        <Packages>
          <Accordion>
            <Accordion.Panel header="10 Token Package">
              <PackageDetail>
                <PackageDescription>1,000 BST Required</PackageDescription>
                <ColorButton color={Color.green} size="small">
                  Buy
                </ColorButton>
              </PackageDetail>
            </Accordion.Panel>
            <Accordion.Panel header="50 Token Package">
              <PackageDetail>
                <PackageDescription>5,000 BST Required</PackageDescription>
                <ColorButton color={Color.green} size="small">
                  Buy
                </ColorButton>
              </PackageDetail>
            </Accordion.Panel>
            <Accordion.Panel header="200 Token Package">
              <PackageDetail>
                <PackageDescription>15,000 BST Required</PackageDescription>
                <ColorButton color={Color.red} size="small">
                  Insufficient fund
                </ColorButton>
              </PackageDetail>
            </Accordion.Panel>
            <Accordion.Panel header="500 Token Package">
              <PackageDetail>
                <PackageDescription>75,000 BST Required</PackageDescription>
                <ColorButton color={Color.red} size="small">
                  Insufficient fund
                </ColorButton>
              </PackageDetail>
            </Accordion.Panel>
            <Accordion.Panel header="1,000 Token Package">
              <PackageDetail>
                <PackageDescription>500,000 BST Required</PackageDescription>
                <ColorButton color={Color.red} size="small">
                  Insufficient fund
                </ColorButton>
              </PackageDetail>
            </Accordion.Panel>
          </Accordion>
        </Packages>
      </ScreenContainer>
    )
  }
}
