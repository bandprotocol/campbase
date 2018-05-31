import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignUpScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Sign Up' }

  render() {
    return (
      <MainView>
        <Text>Sign Up</Text>
      </MainView>
    )
  }
}
