import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '~/antd'
import Color from '~/color'

import IconList from '~/components/IconList'
import DrawerButton from '~/components/DrawerButton'
import CommunityList from '~/components/CommunityList'

import ProfileBodyslamSrc from '~/assets/band-bodyslam.jpg'
import ProfilePotatoSrc from '~/assets/band-potato.jpg'
import ProfileZealSrc from '~/assets/band-zeal.jpg'
import ProfileTattooSrc from '~/assets/band-tattoo.jpg'
import ProfilPlaygroundSrc from '~/assets/band-playground.jpg'

const Container = Style.View``

const WalletPanel = Style.View`
  padding: 20px 30px;
  background-color: rgba(0,0,0,0.5)
`
const BalanceContainer = Style.View`
  flex: 1;
`
const WalletNameText = Style.Text`
  font-size: 18px;
  line-height: 28;
  margin-bottom: 50;
  color: #ffffff;
`
const BalanceButtonContainer = Style.View`
  flex-direction: row;
`
const BalanceText = Style.Text`
  font-size: 24px;
  margin-top: 5px;
  color: #ffffff;
`
const UnitText = Style.Text`
  font-size: 18px;
`
const BuySellButton = Style.TouchableOpacity`
  height: 40;
  width: 40;
  background: rgba(0,0,0,0.5);
  border-radius: 6;
  align-items: center;
  justify-content: center;
  margin-left: 10;
`

const mockCommunityTokens = [
  {
    id: 0,
    name: 'Bodyslam',
    profileImageSrc: ProfileBodyslamSrc,
    detail: '528.32 BST',
  },
  {
    id: 1,
    name: 'Potato',
    profileImageSrc: ProfilePotatoSrc,
    detail: '763.23 PTT',
  },
  {
    id: 2,
    name: 'Zeal',
    profileImageSrc: ProfileZealSrc,
    detail: '183.33 ZLZ',
  },
]

const mockTxns = [
  {
    id: 0,
    name: 'Bodyslam',
    profileImageSrc: ProfileBodyslamSrc,
    detail: 'Buy 30.00 BST @0.134',
  },
  {
    id: 1,
    name: 'Bodyslam',
    profileImageSrc: ProfileBodyslamSrc,
    detail: 'Buy 74.00 BST @0.118',
  },
  {
    id: 2,
    name: 'Bodyslam',
    profileImageSrc: ProfileBodyslamSrc,
    detail: 'Sell 0.50 BST @0.156',
  },
]

export default class WalletScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Wallet',
    headerLeft: <DrawerButton navigation={navigation} />,
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  render() {
    const { navigation } = this.props

    return (
      <Container>
        <WalletPanel>
          <BalanceButtonContainer>
            <BalanceContainer>
              <BalanceText>
                3,982,23 <UnitText>BAND</UnitText>
              </BalanceText>
            </BalanceContainer>

            <BuySellButton>
              <Ionicons name="md-arrow-round-up" size={24} color="#ffffff" />
            </BuySellButton>
            <BuySellButton>
              <Ionicons name="md-arrow-round-down" size={24} color="#ffffff" />
            </BuySellButton>
          </BalanceButtonContainer>
        </WalletPanel>
        <CommunityList
          title="Community Tokens"
          list={mockCommunityTokens}
          onItemClick={id => navigation.navigate('Inventory')}
        />
        <CommunityList
          title="Recent Transactions"
          list={mockTxns}
          onItemClick={id => navigation.navigate('Inventory')}
        />
      </Container>
    )
  }
}