import React from 'react'
import Style from 'styled-components'

const Container = Style.View`
  flex: 1;
`

const Item = Style.Text`
  
`

export default class Drawer extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <Container>
        <Item>Drawer</Item>
      </Container>
    )
  }
}
