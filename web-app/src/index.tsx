// import { ConnectedRouter } from 'connected-react-router'
import App from 'App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from 'registerServiceWorker';
import store from 'store/configure-store.dev'; // TODO
import './index.css';

// TODO config to connect redux

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
