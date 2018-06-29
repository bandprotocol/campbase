import * as React from 'react'
import { AppLoading, Asset, Font } from 'expo'
import { Provider } from 'react-redux'
import Routes from '~/routes'
import { Fonts, autobind } from '~/utils'

import configureStore from '~/store/configure-store.dev'
const store = configureStore()

interface State {
  fontLoaded: boolean;
}

export default class App extends React.Component<{}, State> {
  state = {
    resourcesLoaded: false,
  }

  @autobind
  async loadResouces() {
    // Load fonts
    await Font.loadAsync({
      [Fonts.header]: require('~/assets/fonts/JosefinSans-Bold.ttf'),
      [Fonts.subheader]: require('~/assets/fonts/JosefinSans-LightItalic.ttf'),
    })

    // Cache images
    const images = [
      require('~/assets/branding/welcome-moutain.png'),
      require('~/assets/branding/welcome-sun.png'),
    ]

    await Promise.all(
      images.map(image => Asset.fromModule(image).downloadAsync())
    )
  }

  render() {
    if (!this.state.resourcesLoaded)
      return (
        <AppLoading
          startAsync={this.loadResouces}
          onFinish={() => this.setState({ resourcesLoaded: true })}
          onError={console.warn}
        />
      )

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
