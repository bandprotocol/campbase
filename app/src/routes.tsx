import * as React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'
import { LinearGradient } from 'expo'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Color, Size } from '~/utils'

/** Components */
import DrawerButton from '~/components/DrawerButton'
import HeaderButton from '~/components/HeaderButton'

/** Drawer */
import DrawerContainer from '~/screens/DrawerContainer'

/** Welcome Routes */
import WelcomeContainer from '~/screens/Welcome/WelcomeContainer'

/** Wallet Routes */
import WalletListContainer from '~/screens/Wallet/ListContainer'
import NewWalletMnemonicContainer from '~/screens/Wallet/New/MnemonicContainer'
import NewWalletSetPasscodeContainer from '~/screens/Wallet/New/SetPasscodeContainer'
import NewWalletConfirmPasscodeContainer from '~/screens/Wallet/New/ConfirmPasscodeContainer'
import WalletDetailMainContainer from '~/screens/Wallet/Detail/MainContainer'
import RecoverWalletContainer from '~/screens/Wallet/Recover/MnemonicContainer'
import ScanAddressContainer from '~/screens/Wallet/Detail/ScanAddressContainer'

/** Select Community Routes */
import CommunitySuggested from '~/screens/CommunitySelect/CommunitySuggested'
import CommunityBrowse from '~/screens/CommunitySelect/CommunityBrowse'

const WelcomeStack = createStackNavigator(
  {
    // Community: createMaterialBottomTabNavigator({}),
    Welcome: WelcomeContainer,
  },
  {
    initialRouteName: 'Welcome',
    navigationOptions: {
      headerTintColor: Color.white,
      headerTransparent: true,
      headerTitleStyle: { color: Color.primary },
      headerBackTitleStyle: { color: Color.primary },
    },
  }
)
WelcomeStack.navigationOptions = {
  drawerLabel: 'Communities',
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
      onClick={() => navigation.navigate('WalletList')}
    />
  ),
})

// // For List of TCR
// const CommunityTab = createMaterialBottomTabNavigator(
//   {
//     // ...
//   },
//   {
//     activeTintColor: '#ffffff',
//     inactiveTintColor: 'rgba(255,255,255,0.8)',
//     navigationOptions: {
//       tabBarColor: Color.primary,
//     },
//   }
// )
// CommunityTab.navigationOptions = ({ navigation }) => ({
//   title: 'Bodyslam',
//   headerLeft: <DrawerButton navigation={navigation} />,
//   headerRight: (
//     <HeaderButton
//       content={
//         <MaterialCommunityIcons name="ticket" size={28} color={Color.primary} />
//       }
//       onClick={() => navigation.navigate('Inventory')}
//     />
//   ),
// })

// // For TCR
// const ProductDetailTab = createMaterialTopTabNavigator(
//   {
//     ProductInfo,
//     ProductOfficialStore,
//     ProductMarketplace,
//   },
//   {
//     tabBarOptions: {
//       style: { paddingTop: 80, backgroundColor: '#ffffff' },
//       indicatorStyle: { backgroundColor: Color.primary },
//       activeTintColor: Color.primary,
//       inactiveTintColor: '#d1c1ff',
//     },
//   }
// )
// ProductDetailTab.navigationOptions = ({ navigation }) => ({
//   title: 'Concert 15 Year Bodyslam | Basic Seat',
// })

const CommunityStack = createStackNavigator(
  {
    CommunitySelectTab,
    // CommunityTab,

    /** Store */
    // ProductDetailTab,
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
CommunityStack.navigationOptions = {
  drawerLabel: 'Communities',
}

const WalletStack = createStackNavigator(
  {
    WalletList: WalletListContainer,
    NewWalletMnemonic: NewWalletMnemonicContainer,
    NewWalletSetPasscode: NewWalletSetPasscodeContainer,
    NewWalletConfirmPasscode: NewWalletConfirmPasscodeContainer,
    WalletDetailMain: WalletDetailMainContainer,
    RecoverWallet: RecoverWalletContainer,
    ScanAddress: ScanAddressContainer,
  },
  {
    initialRouteName: 'WalletList',
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
    WelcomeStack,
    WalletStack,
    CommunityStack,
  },
  {
    initialRouteName: 'WelcomeStack',
    contentComponent: DrawerContainer,
  }
)

export default class AppRoutes extends React.Component {
  render() {
    return <DrawerNavigator />
  }
}
