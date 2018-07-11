import * as React from 'react'
import { View } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ListNoWallet from './ListNoWallet'
import List, { Fetching } from './List'
import { BLOCKCHAIN_ENDPOINT } from '~/config'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'
import { generateNewWallet } from '~/store/app/CreateWallet/action'
import * as UserWallets from '~/store/api/UserWallets'
import { Dispatch } from 'react-redux'
import BandProtocolClient from 'bandprotocol'

type Props = PropTypes.withNavigation
type State = {
  wallets: any[]
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      generateNewWallet,
      UserWallets: UserWallets.GET.action,
    },
    dispatch
  )

class WalletListScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Wallet',
    headerLeft: <DrawerButton navigation={navigation} />,
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <HeaderButton
          name="md-unlock"
          onClick={() => navigation.push('RecoverWallet')}
        />
        <HeaderButton
          name="md-add"
          onClick={() => navigation.push('NewWalletMnemonic')}
        />
      </View>
    ),
  })

  state = {
    wallets: null,
  }

  async componentDidMount() {
    const { wallets } = await this.props.UserWallets()

    // Fetch balances
    const client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
    })

    const walletWithBalance = await Promise.all(
      wallets.map(async wallet => ({
        ...wallet,
        address: BandProtocolClient.verifyKeyToAddress(wallet.verify_key),
        balance: await client.blockchain.balance(
          BandProtocolClient.verifyKeyToAddress(wallet.verify_key),
          'BX63 AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA'
        ),
      }))
    )

    this.setState({ wallets: walletWithBalance })
  }

  @autobind
  async onCreateWallet() {
    this.props.navigation.push('NewWalletMnemonic')
  }

  @autobind
  onWalletClick(wallet) {
    this.props.navigation.navigate('WalletDetailMain', { wallet })
  }

  render() {
    const { wallets } = this.state

    if (!Array.isArray(wallets)) {
      return <Fetching />
    }

    if (wallets.length) {
      return <List onWalletClick={this.onWalletClick} wallets={wallets} />
    }

    return <ListNoWallet onCreateWallet={this.onCreateWallet} />
  }
}

export default connect(
  mapState,
  mapAction
)(WalletListScreen)
