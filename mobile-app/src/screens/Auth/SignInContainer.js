import React from 'react'
import { connect } from '~/store'
import SignIn from './SignIn'

@connect(state => ({
  test: 'Some xxx',
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
    return <SignIn onSignIn={onSignIn} />
  }
}
