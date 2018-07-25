import * as React from 'react'
import { View } from 'react-native'
import { Dispatch } from 'redux'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ListNoWallet from './ListNoWallet'
import List, { Fetching } from './List'
import { BLOCKCHAIN_ENDPOINT } from '~/config'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'
import { generateNewWallet } from '~/store/app/Wallets/action'
import BandProtocolClient from 'bandprotocol'
import BandBalance from '~/utils/BandBalance'

type Props = PropTypes.withNavigation
type State = {
  wallets: any
}

const mapState = (state: StateType) => ({ wallets: state.app.Wallets.wallets })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      generateNewWallet,
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
    wallets: {},
  }

  private removeListener

  async componentDidMount() {
    await this.fetchBalance()

    // Watch for screen to be focused
    this.removeListener = this.props.navigation.addListener(
      'didFocus',
      this.fetchBalance
    )
  }

  componentWillUnmount() {
    this.removeListener()
  }

  @autobind
  async fetchBalance() {
    const { wallets } = this.props

    // Fetch balances
    const client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
    })

    const walletWithBalance = await Promise.all(
      Object.keys(wallets).map(async address => {
        const balance = await client.blockchain.balance(
          address,
          'BX63 AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA'
        )

        return {
          address,
          encrypted_secret_key: wallets[address],
          balance: BandBalance.fromBunString(balance),
        }
      })
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
