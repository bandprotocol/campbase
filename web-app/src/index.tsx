// import { ConnectedRouter } from 'connected-react-router'
import App from '~/App'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from '~/registerServiceWorker'
import * as store from '~/store/configure-store.dev' // TODO
import './index.css'

// TODO config to connect redux

ReactDOM.render(
  <Provider store={store.default}>
    <ConnectedRouter history={store.history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
