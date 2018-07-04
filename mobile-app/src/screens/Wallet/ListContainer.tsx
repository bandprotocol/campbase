import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import List from './List'
import { connect, bindActions, StateType } from '~/store'
import BandProtocolClient from 'bandprotocol'
import {
  setAddress,
  setMnemonic,
  setPassword,
  setEncryptedKey,
} from '~/store/app/CreateWallet/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  code: string[]
}

const mapState = (state: StateType) => ({ newWallet: state.app.CreateWallet })
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      setAddress,
      setMnemonic,
      setPassword,
      setEncryptedKey,
    },
    dispatch
  )

class WalletListScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  @autobind
  onCreateWallet() {
    const {} = BandProtocolClient.generateRandomKey()
  }

  render() {
    const { code } = this.state
    return <List onCreateWallet={this.onCreateWallet} />
  }
}

export default connect(
  mapState,
  mapAction
)(WalletListScreen)
