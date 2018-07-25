import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Main from './Main'
import BandProtocolClient from 'bandprotocol'
import { Alert } from 'react-native'
import { BLOCKCHAIN_ENDPOINT } from '~/config'
import BandBalance from '~/utils/BandBalance'

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
  private fetchBalanceInterval
  private watchingBalance = 0

  get wallet() {
    return this.props.navigation.getParam('wallet', null)
  }

  /**
   * Return whether the balance has changed
   */
  @autobind
  async fetchBalance() {
    const balance = await this.client.blockchain.balance(
      this.wallet.address,
      'BX63 AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA'
    )

    console.log('Balance!', balance)

    return new Promise(resolve => {
      const balanceChanged = this.state.balance !== balance
      this.setState({ balance }, () => resolve(balanceChanged))
    })
  }

  /**
   * Fetch to balance has been changed
   */
  async watchBalanceChange() {
    this.watchingBalance++
    while (this.watchingBalance && !(await this.fetchBalance())) {
      await new Promise(r => setTimeout(r, 1000))
    }
    this.watchingBalance--
  }

  async componentDidMount() {
    this.client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
    })

    this.fetchBalance()
    //this.fetchBalanceInterval = setInterval(this.fetchBalance, 500)
  }

  componentWillUnmount() {
    this.watchingBalance = 0
    clearInterval(this.fetchBalanceInterval)
  }

  @autobind
  async onMintBand() {
    const passcode = await this.getPasscode()

    const client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
      keyProvider: {
        secretbox: this.wallet.encrypted_secret_key,
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
      const amountInput = await this.getAmount()
      const amountBun = new BandBalance(amountInput).toBunString()
      const txn = await client.blockchain.txgen({
        msgid: '1',
        vk: client.key.getVerifyKey(),
        token: 'BX63 AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA',
        value: amountBun,
      })
      const signedTxn = client.key.sign(txn)
      const broadcastResult = await client.blockchain.broadcastTxn(signedTxn)
      this.watchBalanceChange()
    } catch (e) {
      console.log('TxGen Error:', e)
    }
  }

  @autobind
  async onSendBand() {
    const passcode = await this.getPasscode()

    const client = new BandProtocolClient({
      httpEndpoint: BLOCKCHAIN_ENDPOINT,
      keyProvider: {
        secretbox: this.wallet.encrypted_secret_key,
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

    const onAddressRead = async address => {
      const amountInput = await this.getAmount()
      const amountBun = new BandBalance(amountInput).toBunString()

      try {
        const txn = await client.blockchain.txgen({
          msgid: '2',
          vk: client.key.getVerifyKey(),
          dest: address,
          token: 'BX63 AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA',
          value: amountBun,
        })
        const signedTxn = client.key.sign(txn)
        const broadcastResult = await client.blockchain.broadcastTxn(signedTxn)
        this.watchBalanceChange()
      } catch (e) {
        console.log('TxGen Error:', e)
      }
    }

    this.props.navigation.navigate('ScanAddress', { callback: onAddressRead })
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

  @autobind
  async getAmount() {
    return new Promise((resolve, reject) => {
      this.getAmountCallback = amount => {
        this.getAmountCallback = null
        resolve(amount)
      }

      this.setState({ promptAmountVisible: true })
    })
  }

  @autobind
  onCancelPromptAmount() {
    this.setState({ promptAmountVisible: false })
  }

  @autobind
  onSubmitPromptAmount(amount: string) {
    this.setState({ promptAmountVisible: false })
    if (this.getAmountCallback) {
      this.getAmountCallback(amount)
    }
  }

  render() {
    const balance =
      this.state.balance === null
        ? ''
        : BandBalance.fromBunString(this.state.balance).toBandString()

    return (
      <Main
        wallet={this.wallet}
        balance={balance}
        onSendBand={this.onSendBand}
        onMintBand={this.onMintBand}
        promptPasscodeVisible={this.state.promptPasscodeVisible}
        onCancelPromptPasscode={this.onCancelPromptPasscode}
        onSubmitPromptPasscode={this.onSubmitPromptPasscode}
        promptAmountVisible={this.state.promptAmountVisible}
        onCancelPromptAmount={this.onCancelPromptAmount}
        onSubmitPromptAmount={this.onSubmitPromptAmount}
      />
    )
  }
}

export default WalletDetailMainScreen
