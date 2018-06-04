import React from 'react'
import { TouchableOpacity } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    style={{ marginLeft: 20 }}
  >
    <Ionicons name="ios-menu" size={28} />
  </TouchableOpacity>
)

export default DrawerButton
