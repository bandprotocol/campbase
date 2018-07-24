import * as React from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ConfirmPasscode from './ConfirmPasscode'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import { saveWallet } from '~/store/app/CreateWallet/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  passcode: string
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      saveWallet,
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
  async onPasscodeConfirm() {
    if (this.props.newWallet.passcode !== this.state.passcode) {
      console.log('Incorrect passcode confirmation')
      return false
    }

    await this.props.saveWallet()

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'WalletList' })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { passcode } = this.state
    return (
      <ConfirmPasscode
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
