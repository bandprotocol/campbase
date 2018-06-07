import React from 'react'
import { View, Text } from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Color from '~/color'
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'

import Drawer from '~/screens/Drawer'
import SignIn from '~/screens/Auth/SignIn'
import SignUp from '~/screens/Auth/SignUp'
import CommunitySuggested from '~/screens/CommunitySelect/CommunitySuggested'
import CommunityBrowse from '~/screens/CommunitySelect/CommunityBrowse'

import StoryFeed from '~/screens/Community/Feeds/StoryFeed'
import FanFeed from '~/screens/Community/Feeds/FanFeed'
import PostComments from '~/screens/Community/Feeds/PostComments'
import Services from '~/screens/Community/Services'
import Events from '~/screens/Community/Events'
import EventDetail from '~/screens/Community/Events/EventDetail'
import Store from '~/screens/Community/Store'
import ProductInfo from '~/screens/Community/Store/Product/Info'
import ProductOfficialStore from '~/screens/Community/Store/Product/OfficialStore'
import ProductMarketplace from '~/screens/Community/Store/Product/Marketplace'
import Inventory from '~/screens/Community/Inventory'

import Wallet from '~/screens/Wallet'

const AuthTab = createMaterialBottomTabNavigator({
  SignIn,
  SignUp,
})
AuthTab.navigationOptions = {
  title: 'Auth',
  drawerLabel: 'Sign Out',
}
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
    StoryFeed,
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
  headerRight: (
    <HeaderButton
      name="ios-archive"
      onClick={() => navigation.navigate('Inventory')}
    />
  ),
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

    /** Comments on Post */
    PostComments,

    /** Event */
    EventDetail,

    /** Product */
    ProductDetailTab,

    /** Inventory */
    Inventory,
    // Community: createMaterialBottomTabNavigator({}),
  },
  {
    initialRouteName: 'CommunitySelectTab',
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: { backgroundColor: Color.primary },
      headerTitleStyle: { color: '#ffffff' },
      headerBackTitleStyle: { color: '#ffffff' },
    },
  }
)
RootStack.navigationOptions = {
  drawerLabel: 'Communities',
}

const WalletStack = createStackNavigator(
  {
    Wallet,
  },
  {
    initialRouteName: 'Wallet',
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: { backgroundColor: Color.primary },
      headerTitleStyle: { color: '#ffffff' },
      headerBackTitleStyle: { color: '#ffffff' },
    },
  }
)
WalletStack.navigationOptions = {
  drawerLabel: 'Wallet',
}

const DrawerNavigator = createDrawerNavigator(
  {
    AuthTab,
    RootStack,
    WalletStack,
  },
  {
    initialRouteName: 'AuthTab',
    contentComponent: Drawer,
  }
)

export default class AppRoutes extends React.Component {
  render() {
    return <DrawerNavigator />
  }
}
