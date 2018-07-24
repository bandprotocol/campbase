// Shim 'crypto' library
global.crypto = require('isomorphic-webcrypto')

// Business as usual
import * as React from 'react'
import { AppLoading, Asset, Font } from 'expo'
import { Provider } from 'react-redux'
// import Routes from '~/routes'
import { Fonts, autobind } from '~/utils'

// import configureStore from '~/store/configure-store.dev'
// let store

import { StyleSheet, Text, View } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface State {
  fontLoaded: boolean;
}

export default class App extends React.Component<{}, State> {
  state = {
    resourcesLoaded: false,
  }

  @autobind
  async loadResouces() {
    // List of images to cache
    const images = [
      require('~/assets/branding/welcome-moutain.png'),
      require('~/assets/branding/welcome-sun.png'),
      require('~/assets/images/paper-plane.png'),
      require('~/assets/images/signup-done.png'),
      require('~/assets/images/wallet.png'),
    ]

    await Promise.all([
      // Cache images
      ...images.map(image => Asset.fromModule(image).downloadAsync()),
      // Load fonts
      Font.loadAsync({
        [Fonts.header]: require('~/assets/fonts/JosefinSans-Bold.ttf'),
        [Fonts.subheader]: require('~/assets/fonts/JosefinSans-LightItalic.ttf'),
      }),
      // Configure store
      // (async () => (store = await configureStore()))(),
    ])
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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    )

    // return (
    //   <Provider store={store}>
    //     <Routes />
    //   </Provider>
    // )
  }
}
