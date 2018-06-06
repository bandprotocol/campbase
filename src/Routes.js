import React from 'react'
import { View } from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Color from '~/color'
import DrawerButton from '~/components/DrawerButton'

import SignIn from '~/screens/Auth/SignIn'
import SignUp from '~/screens/Auth/SignUp'
import CommunitySuggested from '~/screens/CommunitySelect/CommunitySuggested'
import CommunityBrowse from '~/screens/CommunitySelect/CommunityBrowse'

import Story from '~/screens/Community/Story'
import FanFeed from '~/screens/Community/FanFeed'
import Services from '~/screens/Community/Services'
import Events from '~/screens/Community/Events'
import EventDetail from '~/screens/Community/Events/EventDetail'
import Store from '~/screens/Community/Store'
import ProductInfo from '~/screens/Community/Store/Product/Info'
import ProductOfficialStore from '~/screens/Community/Store/Product/OfficialStore'
import ProductMarketplace from '~/screens/Community/Store/Product/Marketplace'

const AuthTab = createMaterialBottomTabNavigator({
  SignIn,
  SignUp,
})
AuthTab.navigationOptions = { title: 'Auth' }
// NOTE: This is how we configure the Header's Title
// Default options are default fot the navigator's
// children, and not the options for the navigator
// itself

const CommunitySelectTab = createMaterialBottomTabNavigator(
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
CommunitySelectTab.navigationOptions = ({ navigation }) => ({
  title: 'Communities',
  headerLeft: <DrawerButton navigation={navigation} />,
})

const CommunityTab = createMaterialBottomTabNavigator(
  {
    Story,
    FanFeed,
    Services,
    Events,
    Store,
  },
  {
    activeTintColor: Color.primary,
    inactiveTintColor: Color.grey,
    navigationOptions: {
      tabBarColor: '#ffffff',
    },
  }
)
CommunityTab.navigationOptions = ({ navigation }) => ({
  title: 'Bodyslam',
  headerLeft: <DrawerButton navigation={navigation} />,
})

const ProductDetailTab = createMaterialTopTabNavigator({
  ProductInfo,
  ProductOfficialStore,
  ProductMarketplace,
})
ProductDetailTab.navigationOptions = ({ navigation }) => ({
  title: 'Concert 15 Year Bodyslam | Basic Seat',
})

const RootStack = createStackNavigator(
  {
    CommunitySelectTab,
    CommunityTab,

    /** Event */
    EventDetail,

    /** Product */
    ProductDetailTab,
    // Community: createMaterialBottomTabNavigator({}),
  },
  {
    initialRouteName: 'CommunitySelectTab',
    navigationOptions: {
      headerStyle: { backgroundColor: Color.primary },
      headerTitleStyle: { color: '#ffffff' },
      headerBackTitleStyle: { color: '#ffffff' },
    },
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    AuthTab,
    RootStack,
  },
  {
    initialRouteName: 'AuthTab',
  }
)

export default class AppRoutes extends React.Component {
  render() {
    return <DrawerNavigator />
  }
}
