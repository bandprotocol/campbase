import * as React from 'react'
import { Provider } from 'react-redux'
import Routes from '~/routes'

import configureStore from '~/store/configure-store.dev'
const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
