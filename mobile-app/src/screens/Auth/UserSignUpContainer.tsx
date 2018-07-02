import * as React from 'react'
import UserSignUp from './UserSignUp'
import { Alert } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import { connect, bindActions } from '~/store'
import { userSignUp } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation
type State = {
  displayName: string
  email: string
}

const mapState = state => ({ state })
const mapAction = dispatch => bindActions({ userSignUp }, dispatch)

class UserSignUpScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  state = {
    displayName: '',
    email: '',
  }

  @autobind
  onEmailChange(email: string) {
    this.setState({
      email,
    })
  }

  @autobind
  onDisplayNameChange(displayName: string) {
    this.setState({
      displayName,
    })
  }

  @autobind
  async onSignUp() {
    if (!this.isValidInfo) {
      return Alert.alert(
        'Hang on, cowboy!',
        "You've got to enter valid phone number before riding the horse."
      )
    }

    if (await this.props.userSignUp(this.state.displayName, this.state.email)) {
      this.props.navigation.navigate('CommunitySuggested')
    }
  }

  get isValidInfo() {
    return !!this.state.email && !!this.state.displayName
  }

  render() {
    const { email, displayName } = this.state
    return (
      <UserSignUp
        isValidInfo={this.isValidInfo}
        email={email}
        displayName={displayName}
        onDisplayNameChange={this.onDisplayNameChange}
        onEmailChange={this.onEmailChange}
        onSignUp={this.onSignUp}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(UserSignUpScreen)
