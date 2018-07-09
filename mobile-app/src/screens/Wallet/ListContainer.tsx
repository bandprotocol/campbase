import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ListNoWallet from './ListNoWallet'
import List from './List'
import { BLOCKCHAIN_ENDPOINT } from '~/config'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'
import { generateNewWallet } from '~/store/app/CreateWallet/action'
import * as UserWallets from '~/store/api/UserWallets'
import { Dispatch } from 'react-redux'
import BandProtocolClient from 'bandprotocol'

type Props = PropTypes.withNavigation & {
  UserWallets: Function
}
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
      <HeaderButton
        name="md-add"
        onClick={() => navigation.push('NewWalletMnemonic')}
      />
    ),
  })

  state = {
    wallets: [],
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
        balance: await client.blockchain.balance(
          wallet.address,
          '0000000000000000000000000000000000000000'
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
    console.log('Wallet select', { wallet })
    this.props.navigation.navigate('WalletDetailMain', { wallet })
  }

  render() {
    const { wallets } = this.state

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
