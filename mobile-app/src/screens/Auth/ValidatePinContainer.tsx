import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ValidatePin from './ValidatePin'
import { connect, bindActions, StateType } from '~/store'
import { validatePin } from '~/store/app/Auth/action'
import { Dispatch } from 'react-redux'

type Props = PropTypes.withNavigation
type State = {
  code: string[]
}

const mapState = (state: StateType) => ({ state })
const mapAction = (dispatch: Dispatch) => bindActions({ validatePin }, dispatch)

class ValidatePinScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  state = {
    code: [],
  }

  @autobind
  async onValidatePin() {
    if (this.state.code.length !== 6) return null

    const result = await this.props.validatePin(this.state.code.join(''))

    if (result) {
      if (result.account_created) {
        // Just login
        this.props.navigation.navigate('CommunitySuggested')
      } else {
        // Go to sign up
        this.props.navigation.navigate('UserSignUp')
      }
    }
  }

  @autobind
  onDigit(digit) {
    if (this.state.code.length < 6)
      this.setState({
        code: this.state.code.concat(digit),
      })
  }

  @autobind
  onReset() {
    this.setState({
      code: [],
    })
  }

  @autobind
  onDelete() {
    this.setState({
      code: this.state.code.slice(0, -1),
    })
  }

  render() {
    const { code } = this.state
    return (
      <ValidatePin
        isCodeValid={code.length === 6}
        code={code}
        onDigit={this.onDigit}
        onReset={this.onReset}
        onDelete={this.onDelete}
        onValidatePin={this.onValidatePin}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(ValidatePinScreen)
