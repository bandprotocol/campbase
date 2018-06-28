import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import { connect } from '~/store'
import { AuthRequestPin, AuthValidatePin } from '~/store/api/'
import SignIn from './SignIn'

interface Props extends PropTypes.withNavigation {
  //
}

interface State {}

export default class SignInScreen extends connect(
  class extends React.Component<Props, State> {},
  state => ({ a: 1 }),
  () => ({ b: 2, x: 10 }),
  {
    AuthRequestPin: AuthRequestPin.POST,
    AuthValidatePin: AuthValidatePin.POST,
  }
) {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  @autobind
  onSignIn() {
    this.props.navigation.navigate('CommunitySuggested')
  }

  render() {
    return <SignIn onSignIn={this.onSignIn} />
  }
}
