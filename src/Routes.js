import React from 'react'
import {
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import SignIn from '~/routes/Auth/SignIn'
import SignUp from '~/routes/Auth/SignUp'
import CommunitySuggested from '~/routes/CommunitySelect/CommunitySuggested'
import CommunityBrowse from '~/routes/CommunitySelect/CommunityBrowse'

const ScreenWithLabel = (screen, label) => ({
  screen: screen,
  navigationOptions: () => ({
    tabBarLabel: label,
  }),
})

const RootSwitch = createSwitchNavigator(
  {
    Auth: createBottomTabNavigator({
      SignIn: ScreenWithLabel(SignIn, 'Sign In'),
      SignUp: ScreenWithLabel(SignUp, 'Sign Up'),
    }),
    CommunitySelect: createBottomTabNavigator({
      CommunitySuggested: ScreenWithLabel(CommunitySuggested, 'Suggested'),
      CommunityBrowse: ScreenWithLabel(CommunityBrowse, 'Browse'),
    }),
    // Community: createBottomTabNavigator({}),
  },
  {
    initialRouteName: 'Auth',
  }
)

export default class AppRoutes extends React.Component {
  render() {
    return <RootSwitch />
  }
}
