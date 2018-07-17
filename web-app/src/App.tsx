import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '~/screens/Dashboard'
import PreSignIn from '~/screens/PreSignIn'
import Register from '~/screens/Register'
import './App.css'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact={true} path="/" component={PreSignIn} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/dashboard" component={Dashboard} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
