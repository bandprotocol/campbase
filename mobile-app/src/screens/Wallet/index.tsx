import * as React from 'react'
import { withNavigationProps } from '~/declare'
import Style from '~/styled-components'
import { Ionicons } from '@expo/vector-icons'
import { Button, Modal, Toast } from 'antd-mobile-rn'
import { Color } from '~/utils'
import ScreenContainer from '~/components/ScreenContainer'

import IconList from '~/components/IconList'
import DrawerButton from '~/components/DrawerButton'
import CommunityList from '~/components/CommunityList'

import * as ProfileBodyslamSrc from '~/assets/band-bodyslam.jpg'
import * as ProfilePotatoSrc from '~/assets/band-potato.jpg'
import * as ProfileZealSrc from '~/assets/band-zeal.jpg'
import * as ProfileTattooSrc from '~/assets/band-tattoo.jpg'
import * as ProfilPlaygroundSrc from '~/assets/band-playground.jpg'
import * as QRSrc from '~/assets/product-qrcode.jpg'

const WalletPanel = Style.View`
  padding: 20px 30px;
  background-color: ${Color.primary};
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
const QRImage = Style.Image`
  aspect-ratio: 1;
  resize-mode: contain;
  margin-top: 10;
  width: 100%;
  height: null;
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

interface WalletScreenState {
  showAddressModal: boolean
}

export default class WalletScreen extends React.Component<
  withNavigationProps,
  WalletScreenState
> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Wallet',
    headerLeft: <DrawerButton navigation={navigation} />,
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  constructor(props) {
    super(props)
    this.state = {
      showAddressModal: false,
    }
  }

  onSend() {
    const promptAmount = () =>
      Modal.prompt(
        'Send BAND Tokens',
        'Please input the amount',
        [
          { text: 'Cancel' },
          {
            text: 'Send',
            onPress: async val =>
              setTimeout(
                () => Toast.success(`Successfully sent ${val} BAND`),
                500
              ),
          },
        ],
        'Default',
        null,
        ['Amount of BAND you want to send']
      )

    Modal.prompt(
      'Send BAND Tokens',
      'Please input transaction information',
      [
        { text: 'Cancel' },
        {
          text: 'Next',
          onPress: async () => setTimeout(promptAmount, 1000),
        },
      ],
      'login-password',
      null,
      ['Recipient Address', 'Wallet Passcode']
    )
  }

  onReceive() {
    this.setState({ showAddressModal: true })
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer scrollable>
        <WalletPanel>
          <BalanceButtonContainer>
            <BalanceContainer>
              <BalanceText>
                3,982.23 <UnitText>BAND</UnitText>
              </BalanceText>
            </BalanceContainer>

            <BuySellButton onPress={this.onSend.bind(this)}>
              <Ionicons name="md-arrow-round-up" size={24} color="#ffffff" />
            </BuySellButton>
            <BuySellButton onPress={this.onReceive.bind(this)}>
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

        {/* QR Code Modal */}

        <Modal
          visible={this.state.showAddressModal}
          maskClosable={true}
          onClose={() => this.setState({ showAddressModal: false })}
          title="Address: 0x13a8bf9450"
          transparent
        >
          <QRImage source={QRSrc} />
        </Modal>
      </ScreenContainer>
    )
  }
}
