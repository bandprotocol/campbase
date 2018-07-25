import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Welcome from './Welcome'
import { connect, StateType } from '~/store'

interface Props extends PropTypes.withNavigation {}

const mapState = (state: StateType) => ({ wallets: state.app.Wallets.wallets })

class WelcomeScreen extends React.Component<
  Props & ReturnType<typeof mapState>
> {
  componentDidMount() {
    if (this.props.wallets && Object.keys(this.props.wallets).length) {
      this.props.navigation.navigate('RootStack')
    }
  }

  @autobind
  async onStartPhoneAuth() {
    this.props.navigation.navigate('WalletList')
  }

  render() {
    return <Welcome onStartPhoneAuth={this.onStartPhoneAuth} />
  }
}

export default connect(mapState)(WelcomeScreen)
