import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import SignIn from '~/screens/Auth/SignIn'
import SignUp from '~/screens/Auth/SignUp'
import CommunitySuggested from '~/screens/CommunitySelect/CommunitySuggested'
import CommunityBrowse from '~/screens/CommunitySelect/CommunityBrowse'

import Story from '~/screens/Community/Story'
import FanFeed from '~/screens/Community/FanFeed'
import Services from '~/screens/Community/Services'
import Events from '~/screens/Community/Events'
import Store from '~/screens/Community/Store'

const AuthTab = createBottomTabNavigator({
  SignIn,
  SignUp,
})
AuthTab.navigationOptions = { title: 'Auth' }
// NOTE: This is how we configure the Header's Title
// Default options are default fot the navigator's
// children, and not the options for the navigator
// itself

const CommunitySelectTab = createBottomTabNavigator(
  {
    CommunitySuggested,
    CommunityBrowse,
  },
  {
    navigationOptions: {
      tabBarOptions: {
        showIcon: false,
      },
    },
  }
)
CommunitySelectTab.navigationOptions = { title: 'Communities' }

const CommunityTab = createBottomTabNavigator({
  Story,
  FanFeed,
  Services,
  Events,
  Store,
})
CommunityTab.navigationOptions = { title: 'Bodyslam' }

const RootStack = createStackNavigator(
  {
    AuthTab,
    CommunitySelectTab,
    CommunityTab,
    // Community: createBottomTabNavigator({}),
  },
  {
    initialRouteName: 'AuthTab',
  }
)

export default class AppRoutes extends React.Component {
  render() {
    return <RootStack />
  }
}
