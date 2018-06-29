import * as React from 'react'
import RequestPin from './RequestPin'
import { Alert } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import { connect, bindActions } from '~/store'
import { requestPin } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation
type State = {
  countryCode: string
  phoneNumber: string
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
    countryCode: '',
    phoneNumber: '',
    validNumber: false,
  }

  @autobind
  onSelectCountry(countryCode: string) {
    this.setState({
      countryCode,
      validNumber: this.phoneNumberPicker.isValidNumber(),
    })
  }

  @autobind
  onChangePhoneNumber(phoneNumber: string) {
    this.setState({
      phoneNumber,
      validNumber: this.phoneNumberPicker.isValidNumber(),
    })
  }

  @autobind
  async onRequestPin() {
    // Debug:
    this.props.navigation.navigate('ValidatePin')

    if (!this.state.validNumber) {
      return Alert.alert(
        'Hang on, cowboy!',
        'Ya gotta enter valid phone number before riding the horse.'
      )
    }

    if (
      await this.props.requestPin(
        this.state.countryCode,
        this.state.phoneNumber
      )
    ) {
      this.props.navigation.navigate('ValidatePin')
    }
  }

  render() {
    return (
      <RequestPin
        isValidNumber={this.state.validNumber}
        onRequestPin={this.onRequestPin}
        onSelectCountry={this.onSelectCountry}
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
