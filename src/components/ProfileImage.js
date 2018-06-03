import React from 'react'
import PropTypes from 'prop-types'
import Style from 'styled-components'

const Image = Style.Image`
  height: 60;
  width: 60;
  border-radius: 30;
`

export default class ProfileImage extends React.Component {
  render() {
    return <Image source={this.props.src} />
  }
}
