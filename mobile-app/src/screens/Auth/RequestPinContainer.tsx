import * as React from 'react'
import RequestPin from './RequestPin'
import { Alert } from 'react-native'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import { connect, bindActions } from '~/store'
import { requestPin } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation
type State = {
  country_code: string
  phone_number: string
  valid_number: boolean
}

const mapState = state => ({ state })
const mapAction = dispatch => bindActions({ requestPin }, dispatch)

class RequestPinScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  private phoneNumberPicker

  state = {
    country_code: '',
    phone_number: '',
    valid_number: false,
  }

  @autobind
  onSelectCountry(country_code: string) {
    this.setState({
      country_code,
      valid_number: this.phoneNumberPicker.isValidNumber(),
    })
  }

  @autobind
  onChangePhoneNumber(phone_number: string) {
    this.setState({
      phone_number,
      valid_number: this.phoneNumberPicker.isValidNumber(),
    })
  }

  @autobind
  async onRequestPin() {
    if (!this.state.valid_number) {
      return Alert.alert(
        'Hold on!',
        'Please enter valid phone number before proceeding.'
      )
    }

    if (
      await this.props.requestPin(
        this.state.country_code,
        this.state.phone_number
      )
    ) {
      this.props.navigation.navigate('ValidatePin')
    }
  }

  render() {
    return (
      <RequestPin
        isValidNumber={this.state.valid_number}
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
