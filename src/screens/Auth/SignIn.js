import React from 'react'
import { StatusBar } from 'react-native'
import Style from 'styled-components'
import { Button } from '~/antd'
import { Color } from '~/utils'

const Container = Style.SafeAreaView`
  flex: 1;
  background-color: ${Color.primary};
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
          onClick={() => this.props.navigation.navigate('CommunitySuggested')}
        >
          Sign In
        </Button>
      </Container>
    )
  }
}
