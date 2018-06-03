import React from 'react'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class CommunityServicesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Services',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name="ios-play-outline" color={tintColor} size={28} />
    ),
  }

  render() {
    return <Text>Community Services</Text>
  }
}
