import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Mnnemonic from './Mnnemonic'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import { setPassword, setEncryptedKey } from '~/store/app/CreateWallet/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  passcode: string
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      setPassword,
      setEncryptedKey,
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

  @autobind
  onSetPasscode() {
    const passcode = '10'
    this.setState({ passcode })
  }

  @autobind
  onConfirmasscode(confirmPasscode) {
    const { passcode } = this.state
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
