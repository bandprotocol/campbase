import * as React from 'react'
import { TextInput } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import SetPasscode from './SetPasscode'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import { setPasscode } from '~/store/app/CreateWallet/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  passcode: string
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      setPasscode,
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
  onPasscodeChange(passcode) {
    this.setState({ passcode })
  }

  @autobind
  onPasscodeConfirm() {
    this.props.setPasscode(this.state.passcode)
    this.props.navigation.push('NewWalletConfirmPasscode')
  }

  render() {
    const { passcode } = this.state
    return (
      <SetPasscode
        passcode={passcode}
        onPasscodeChange={this.onPasscodeChange}
        onPasscodeConfirm={this.onPasscodeConfirm}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(WalletListScreen)
