import React from 'react'
import Style from 'styled-components'
import { Text } from 'react-native'
import { Button } from '~/antd'

const MainView = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignInScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  render() {
    return (
      <MainView>
        <Button
          type="primary"
          onClick={() => this.props.navigation.replace('CommunitySelectTab')}
        >
          Sign In
        </Button>
      </MainView>
    )
  }
}
