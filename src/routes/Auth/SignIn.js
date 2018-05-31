import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignInRoute extends React.Component {
  get title() {
    return 'Sign In'
  }
  render() {
    return (
      <MainView>
        <Text onPress={() => this.props.navigation.navigate('CommunitySelect')}>
          Sign In
        </Text>
      </MainView>
    )
  }
}
