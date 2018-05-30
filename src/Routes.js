import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import SignIn from '~/routes/SignIn'
import SignUp from '~/routes/SignUp'
import CommunitySuggested from '~/routes/CommunitySuggested'
import CommunityBrowse from '~/routes/CommunityBrowse'

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="auth" tabs={true}>
            <Scene key="sign-in" component={SignIn} hideNavBar={true} />
            <Scene key="sign-up" component={SignUp} hideNavBar={true} />
          </Scene>
          <Scene key="community-select" tabs={true} tabBarPosition="Bottom">
            <Scene key="community-suggested" component={CommunitySuggested} />
            <Scene key="community-browse" component={CommunityBrowse} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}
