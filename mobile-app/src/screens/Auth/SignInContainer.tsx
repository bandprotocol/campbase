import * as React from 'react'
import { Alert } from 'react-native'
import { connectAPI } from '~/store'
import { AuthRequestPin, AuthLoginPhone } from '~/store/api/'
import SignIn from './SignIn'
import { withNavigationProps } from '~/declare'
import { API } from 'store/helpers/api'

interface StateToPropsReturn {
  a: number
}
interface ActionsToPropsReturn {
  b: number
}
interface connectAPIx {
  [alias: string]: API
}

@connectAPI<StateToPropsReturn, ActionsToPropsReturn, connectAPIx>(
  {
    AuthRequestPin: AuthRequestPin.POST,
  },
  () => ({ a: 1 }),
  () => ({ b: 2 })
)
export default class SignInScreen extends React.Component<withNavigationProps> {
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
