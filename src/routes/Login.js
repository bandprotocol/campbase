import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class LoginRoute extends React.Component {
  render() {
    return (
      <MainView>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </MainView>
    )
  }
}
