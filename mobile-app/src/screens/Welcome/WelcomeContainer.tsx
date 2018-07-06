import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Welcome from './Welcome'
import { connect, StateType } from '~/store'
import { requestPin } from '~/store/app/Auth/action'

interface Props extends PropTypes.withNavigation {}

const mapState = (state: StateType) => ({ isLogin: state.app.Auth.is_login })

class WelcomeScreen extends React.Component<
  Props & ReturnType<typeof mapState>
> {
  componentDidMount() {
    if (this.props.isLogin) {
      this.props.navigation.navigate('RootStack')
    }
  }

  @autobind
  async onStartPhoneAuth() {
    this.props.navigation.navigate('RequestPin')
  }

  render() {
    return <Welcome onStartPhoneAuth={this.onStartPhoneAuth} />
  }
}

export default connect(mapState)(WelcomeScreen)
