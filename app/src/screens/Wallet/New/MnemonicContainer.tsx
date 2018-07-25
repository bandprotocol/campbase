import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Mnnemonic from './Mnemonic'
import { generateNewWallet, resetNewWallet } from '~/store/app/Wallets/action'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import { Dispatch } from 'redux'

type Props = PropTypes.withNavigation
type State = {
  passcode: string
}

const mapState = (state: StateType) => ({
  newWallet: state.app.Wallets.newWallet,
})
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      generateNewWallet,
      resetNewWallet,
    },
    dispatch
  )
class WalletListScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create New Wallet',
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  state = {
    passcode: '',
  }

  componentWillMount() {
    this.props.resetNewWallet()
  }

  componentDidMount() {
    setTimeout(this.props.generateNewWallet, 100)
  }

  @autobind
  onSetPasscode() {
    this.props.navigation.push('NewWalletSetPasscode')
  }

  render() {
    const { passcode } = this.state
    return (
      <Mnnemonic
        onSetPasscode={this.onSetPasscode}
        mnemonic={this.props.newWallet.mnemonic}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(WalletListScreen)
