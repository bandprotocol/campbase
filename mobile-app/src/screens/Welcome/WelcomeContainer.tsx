import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import Welcome from './Welcome'
import { connect, bindActions } from '~/store'
import { requestPin } from '~/store/app/Auth/action'

interface Props extends PropTypes.withNavigation {}

export default class SignInScreen extends React.Component<Props> {
  @autobind
  async onStartPhoneAuth() {
    this.props.navigation.navigate('RequestPin')
  }

  render() {
    return <Welcome onStartPhoneAuth={this.onStartPhoneAuth} />
  }
}
