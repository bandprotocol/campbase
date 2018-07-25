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
  async onWallet() {
    this.props.navigation.navigate('WalletList')
  }

  @autobind
  async onExplore() {
    this.props.navigation.navigate('RootStack')
  }

  render() {
    return <Welcome onWallet={this.onWallet} onExplore={this.onExplore} />
  }
}

export default connect(mapState)(WelcomeScreen)
