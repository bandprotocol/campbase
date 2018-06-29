import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ValidatePin from './ValidatePin'

interface Props extends PropTypes.withNavigation {}

export default class SignInScreen extends React.Component<Props> {
  render() {
    return <ValidatePin />
  }
}
