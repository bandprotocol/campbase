import * as React from 'react';
import { Route } from 'react-router-dom';
import PreSignIn from 'screens/PreSignIn';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <main>
          <Route exact={true} path="/" component={PreSignIn} />
        </main>
      </div>
    );
  }
}

export default App;
