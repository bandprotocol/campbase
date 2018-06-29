import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ValidatePin from './ValidatePin'

interface Props extends PropTypes.withNavigation {}
interface State {
  countryCode: string
  phoneNumber: string
}

export default class ValidatePinScreen extends React.Component<Props, State> {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  constructor(props, context) {
    super(props, context)

    this.state = {
      countryCode: '1',
      phoneNumber: '',
    }
  }

  render() {
    return <ValidatePin />
  }
}
