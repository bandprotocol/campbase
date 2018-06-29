import * as React from 'react'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'
import ValidatePin from './ValidatePin'
import { connect, bindActions } from '~/store'
import { validatePin } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation
type State = {
  code: string[]
}

const mapState = state => ({ state })
const mapAction = dispatch => bindActions({ validatePin }, dispatch)

class ValidatePinScreen extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>,
  State
> {
  state = {
    code: [],
  }

  render() {
    const { code } = this.state
    return <ValidatePin code={code} />
  }
}

export default connect(
  mapState,
  mapAction
)(ValidatePinScreen)
