import * as React from 'react'
import { Font } from 'expo'
import { Provider } from 'react-redux'
import Routes from '~/routes'
import { Fonts } from '~/utils'

import configureStore from '~/store/configure-store.dev'
const store = configureStore()

interface State {
  fontLoaded: boolean
}

export default class App extends React.Component<{}, State> {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      [Fonts.header]: require('./assets/fonts/JosefinSans-Bold.ttf')
      [Fonts.subheader]: require('./assets/fonts/JosefinSans-LightItalic.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      <Provider store={store}>
        {
          this.state.fontLoaded && <Routes />
        }
      </Provider>
    )
  }
}
