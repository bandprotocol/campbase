import React from 'react'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class CommunityStoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Store',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name="ios-cart-outline" color={tintColor} size={28} />
    ),
  }

  render() {
    return <Text>Community Store</Text>
  }
}
