import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignUpRoute extends React.Component {
  render() {
    return (
      <MainView>
        <Text>Sign Up</Text>
      </MainView>
    )
  }
}
