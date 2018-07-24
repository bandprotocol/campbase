import * as React from 'react'
import Styled from '~/styled-components'

const Image = Styled.Image`
  height: 52;
  width: 52;
  border-radius: 26;
`

export default class ProfileImage extends React.Component {
  render() {
    return <Image source={this.props.src} />
  }
}
