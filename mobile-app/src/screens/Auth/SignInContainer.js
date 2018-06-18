import React from 'react'
import { Alert } from 'react-native'
import { connect } from '~/store'
import SignIn from './SignIn'

@connect(state => ({
  // KV
}))
export default class SignInScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  constructor(props) {
    super(props)
    this.onSignIn = this.onSignIn.bind(this)
  }

  onSignIn() {
    this.props.navigation.navigate('CommunitySuggested')
  }

  render() {
    return <SignIn onSignIn={this.onSignIn} />
  }
}
