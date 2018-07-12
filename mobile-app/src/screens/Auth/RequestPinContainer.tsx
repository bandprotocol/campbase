import * as React from 'react'
import { Keyboard } from 'react-native'
import RequestPin from './RequestPin'
import { Alert } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import { connect, bindActions } from '~/store'
import { requestPin } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation
type State = {
  fullPhoneNumber: string
  validNumber: boolean
}

const mapState = state => ({ state })
const mapAction = dispatch => bindActions({ requestPin }, dispatch)

class RequestPinScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  private phoneNumberPicker

  state = {
    fullPhoneNumber: '',
    validNumber: false,
  }

  @autobind
  onChangePhoneNumber(phoneNumber: string) {
    this.setState({
      fullPhoneNumber: phoneNumber,
      validNumber: this.phoneNumberPicker.isValidNumber(),
    })

    if (this.phoneNumberPicker.isValidNumber()) {
      // this.phoneNumberPicker.close()
      Keyboard.dismiss()
    }
  }

  @autobind
  async onRequestPin() {
    if (!this.state.validNumber) {
      return Alert.alert(
        'Hang on, cowboy!',
        "You've got to enter valid phone number before riding the horse."
      )
    }

    const countryCode = this.phoneNumberPicker.getCountryCode()
    const phoneNumber = this.phoneNumberPicker
      .getValue()
      .slice(1 + countryCode.length)

    if (await this.props.requestPin(countryCode, phoneNumber)) {
      this.props.navigation.navigate('ValidatePin')
    }
  }

  render() {
    return (
      <RequestPin
        isValidNumber={this.state.validNumber}
        onRequestPin={this.onRequestPin}
        onChangePhoneNumber={this.onChangePhoneNumber}
        refPhoneNumberPicker={ref => (this.phoneNumberPicker = ref)}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(RequestPinScreen)
