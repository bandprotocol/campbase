import * as React from 'react'
import Style from '~/styled-components'

const Image = Style.Image`
  height: 52;
  width: 52;
  border-radius: 26;
`

export default class ProfileImage extends React.Component {
  render() {
    return <Image source={this.props.src} />
  }
}
