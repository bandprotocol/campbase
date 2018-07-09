import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Main from './Main'
import BandProtocolClient from 'bandprotocol'
import { Alert } from 'react-native'
import { BLOCKCHAIN_ENDPOINT } from '~/config'
import { createCipher } from 'crypto'

type Props = PropTypes.withNavigation
type State = {
  balance: number
  promptPasscodeVisible: boolean
  passcode: string
}

class WalletDetailMainScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Wallet',
    // headerRight: (
    //   <HeaderButton
    //     name="ios-archive"
    //     onClick={() => navigation.navigate('Inventory')}
    //   />
    // ),
  })

  state = {
    balance: null,
    promptPasscodeVisible: false,
    passcode: null,
  }

  private client: BandProtocolClient
  private getPasscodeCallback: Function

  get wallet() {
    return this.props.navigation.getParam('wallet', null)
  }

  async componentDidMount() {
    this.client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
    })

    const balance = await this.client.blockchain.balance(
      this.wallet.address,
      '0000000000000000000000000000000000000000'
    )

    this.setState({ balance })
  }

  @autobind
  onSendBand() {
    this.props.navigation.push('NewWalletSetPasscode')
  }

  @autobind
  async onMintBand() {
    const passcode = await this.getPasscode()

    console.log('L', {
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
      keyProvider: {
        box: this.wallet.encrypted_key,
        passcode,
      },
    })

    const client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
      keyProvider: {
        box: this.wallet.encrypted_key,
        passcode,
      },
    })

    if (!client.key) {
      Alert.alert(
        'Incorrect passcode!',
        'Would you like to try again?',
        [
          { text: 'Yes', onPress: this.onMintBand },
          { text: 'No', onPress: () => false, style: 'cancel' },
        ],
        { cancelable: false }
      )

      return false
    }

    try {
      const txn = await client.blockchain.txgen({
        msgid: '1',
        vk: client.key.getPublicKey(),
        token: '0000000000000000000000000000000000000000',
        value: '100',
      })

      console.log('Txn', txn)
    } catch (e) {
      console.log('Err', e)
    }
  }

  @autobind
  async getPasscode() {
    return new Promise((resolve, reject) => {
      this.getPasscodeCallback = passcode => {
        this.getPasscodeCallback = null
        resolve(passcode)
      }

      this.setState({ promptPasscodeVisible: true })
    })
  }

  @autobind
  onCancelPromptPasscode() {
    this.setState({ promptPasscodeVisible: false })
  }

  @autobind
  onSubmitPromptPasscode(passcode: string) {
    this.setState({ promptPasscodeVisible: false, passcode })
    if (this.getPasscodeCallback) {
      this.getPasscodeCallback(passcode)
    }
  }

  render() {
    return (
      <Main
        wallet={this.wallet}
        balance={this.state.balance}
        promptPasscodeVisible={this.state.promptPasscodeVisible}
        onSendBand={this.onSendBand}
        onMintBand={this.onMintBand}
        onCancelPromptPasscode={this.onCancelPromptPasscode}
        onSubmitPromptPasscode={this.onSubmitPromptPasscode}
      />
    )
  }
}

export default WalletDetailMainScreen
