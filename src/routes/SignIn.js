import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignInRoute extends React.Component {
  render() {
    return (
      <MainView>
        <Text onPress={() => Actions.push('community-suggested')}>Sign In</Text>
      </MainView>
    )
  }
}
