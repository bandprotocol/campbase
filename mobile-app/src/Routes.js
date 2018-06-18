import React from 'react'
import { View, Text } from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'
import { LinearGradient } from 'expo'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Color, Size } from '~/utils'
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'

import Drawer from '~/screens/Drawer'
import SignInContainer from '~/screens/Auth/SignInContainer'
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
import ProductList from '~/screens/Community/Store/ProductList'
import MarketplaceList from '~/screens/Community/Store/MarketplaceList'
import ItemList from '~/screens/Community/Store/ItemList'
import ReceiptList from '~/screens/Community/Store/ReceiptList'
import ProductInfo from '~/screens/Community/Store/Product/Info'
import ProductOfficialStore from '~/screens/Community/Store/Product/OfficialStore'
import ProductMarketplace from '~/screens/Community/Store/Product/Marketplace'
import Inventory from '~/screens/Community/Inventory'
import AttentionTokens from '~/screens/Community/Inventory/AttentionTokens'
import Subscription from '~/screens/Community/Subscription'

import Wallet from '~/screens/Wallet'

const AuthTab = createMaterialTopTabNavigator(
  {
    SignInContainer,
    SignUp,
  },
  {
    tabBarOptions: {
      style: { paddingTop: Size.statusBarHeight, backgroundColor: '#ffffff' },
      indicatorStyle: { backgroundColor: Color.primary },
      activeTintColor: Color.primary,
      inactiveTintColor: '#d1c1ff',
    },
  }
)
AuthTab.navigationOptions = {
  title: 'Auth',
  drawerLabel: 'Sign Out',
}
// NOTE: This is how we configure the Header's Title
// Default options are default fot the navigator's
// children, and not the options for the navigator
// itself

const CommunitySelectTab = createMaterialTopTabNavigator(
  {
    CommunitySuggested,
    CommunityBrowse,
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Size.statusAndHeaderHeight,
        backgroundColor: '#ffffff',
      },
      indicatorStyle: { backgroundColor: Color.primary },
      activeTintColor: Color.primary,
      inactiveTintColor: '#d1c1ff',
    },
  }
)
CommunitySelectTab.navigationOptions = ({ navigation }) => ({
  title: 'Communities',
  headerLeft: <DrawerButton navigation={navigation} />,
  headerRight: (
    <HeaderButton
      content={<Entypo name="wallet" size={26} color={Color.primary} />}
      onClick={() => navigation.navigate('Wallet')}
    />
  ),
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
    activeTintColor: '#ffffff',
    inactiveTintColor: 'rgba(255,255,255,0.8)',
    navigationOptions: {
      tabBarColor: Color.primary,
    },
  }
)
CommunityTab.navigationOptions = ({ navigation }) => ({
  title: 'Bodyslam',
  headerLeft: <DrawerButton navigation={navigation} />,
  headerRight: (
    <HeaderButton
      content={
        <MaterialCommunityIcons name="ticket" size={28} color={Color.primary} />
      }
      onClick={() => navigation.navigate('Inventory')}
    />
  ),
})

const ProductDetailTab = createMaterialTopTabNavigator(
  {
    ProductInfo,
    ProductOfficialStore,
    ProductMarketplace,
  },
  {
    tabBarOptions: {
      style: { paddingTop: 80, backgroundColor: '#ffffff' },
      indicatorStyle: { backgroundColor: Color.primary },
      activeTintColor: Color.primary,
      inactiveTintColor: '#d1c1ff',
    },
  }
)
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

    /** Store */
    ProductDetailTab,
    ProductList,
    MarketplaceList,
    ItemList,
    ReceiptList,

    /** Inventory */
    Inventory,
    AttentionTokens,

    /** Subscription */
    Subscription,
    // Community: createMaterialBottomTabNavigator({}),
  },
  {
    initialRouteName: 'CommunitySelectTab',
    navigationOptions: {
      headerTintColor: Color.primary,
      headerTransparent: true,
      headerBackground: (
        <LinearGradient
          colors={[
            'rgba(255,255,255,1)',
            'rgba(255,255,255,0.9)',
            'rgba(255,255,255,0.95)',
          ]}
          style={{
            flex: 1,
          }}
        />
      ),
      headerTitleStyle: { color: Color.primary },
      headerBackTitleStyle: { color: Color.primary },
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
      headerTintColor: Color.primary,
      headerTransparent: true,
      headerBackground: (
        <LinearGradient
          colors={[
            'rgba(255,255,255,1)',
            'rgba(255,255,255,0.9)',
            'rgba(255,255,255,0.95)',
          ]}
          style={{
            flex: 1,
          }}
        />
      ),
      headerTitleStyle: { color: Color.primary },
      headerBackTitleStyle: { color: Color.primary },
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
