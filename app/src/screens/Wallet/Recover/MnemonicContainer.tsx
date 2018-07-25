import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Mnnemonic from './Mnemonic'
import { recoverWallet, resetNewWallet } from '~/store/app/Wallets/action'
import { connect, bindActions, StateType } from '~/store'
import DrawerButton from '~/components/DrawerButton'
import { Dispatch } from 'redux'

type Props = PropTypes.withNavigation
type State = {
  mnemonic: string[]
  mnemonicPromptIndex: number
}

const mapState = (state: StateType) => ({
  newWallet: state.app.Wallets.newWallet,
})
const mapAction = (dispatch: Dispatch) =>
  bindActions(
    {
      recoverWallet,
      resetNewWallet,
    },
    dispatch
  )
class RecoverWalletScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recover Your Wallet',
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  state = {
    mnemonic: Array(24).fill(''),
    mnemonicPromptIndex: null,
  }

  componentWillMount() {
    this.props.resetNewWallet()
  }

  @autobind
  onWordChange(index: number, value: string) {
    const newMnemonic = [...this.state.mnemonic]
    newMnemonic[index] = value
    this.setState({ mnemonic: newMnemonic })
  }

  @autobind
  onRecover() {
    // Warning
    this.props.recoverWallet(this.state.mnemonic)
    this.props.navigation.push('NewWalletSetPasscode')
  }

  render() {
    return (
      <Mnnemonic
        mnemonicPromptIndex={this.state.mnemonicPromptIndex}
        onCancelPrompt={() => this.setState({ mnemonicPromptIndex: null })}
        onSubmitPrompt={(value: string) => {
          this.onWordChange(this.state.mnemonicPromptIndex, value)
          this.setState({ mnemonicPromptIndex: null })
        }}
        triggerPrompt={index => this.setState({ mnemonicPromptIndex: index })}
        mnemonic={this.state.mnemonic}
        onRecover={this.onRecover}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(RecoverWalletScreen)
