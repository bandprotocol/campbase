import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'
import { Color } from '~/utils'

const MainView = Style.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

export default class SignUpScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Sign Up' }

  render() {
    return (
      <MainView>
        <Text style={{ color: '#ffffff' }}>Sign Up Not Available</Text>
      </MainView>
    )
  }
}
