import React from 'react'
import { StatusBar } from 'react-native'
import Style from 'styled-components'
import { Button } from '~/antd'
import Color from '~/color'

const Container = Style.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`

export default class SignInScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Sign In' }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={Color.primary} />
        <Button
          type="primary"
          onClick={() => this.props.navigation.navigate('RootStack')}
        >
          Sign In
        </Button>
      </Container>
    )
  }
}
