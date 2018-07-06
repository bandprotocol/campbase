import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import List from './List'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import {
  generateNewWallet,
  setPassword,
  setEncryptedKey,
} from '~/store/app/CreateWallet/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  passcode: string[]
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      generateNewWallet,
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
    title: 'Your Wallet',
    headerLeft: <DrawerButton navigation={navigation} />,
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  state = {
    passcode: [],
  }

  @autobind
  onCreateWallet() {
    this.props.generateNewWallet()
  }

  render() {
    const { passcode } = this.state
    return <List onCreateWallet={this.onCreateWallet} />
  }
}

export default connect(
  mapState,
  mapAction
)(WalletListScreen)
