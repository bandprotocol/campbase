import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Welcome from './Welcome'

interface Props extends PropTypes.withNavigation {}

export default class SignInScreen extends React.Component<Props> {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  @autobind
  onLogin() {
    this.props.navigation.navigate('ValidatePin', { action: 'login' })
  }

  @autobind
  onSignUp() {
    this.props.navigation.navigate('ValidatePin', { action: 'signup' })
  }

  render() {
    return <Welcome onLogin={this.onLogin} onSignUp={this.onSignUp} />
  }
}
