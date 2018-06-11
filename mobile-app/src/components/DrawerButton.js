import React from 'react'
import { TouchableOpacity } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Color } from '~/utils'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    style={{ marginLeft: 20 }}
  >
    <Ionicons name="ios-menu" size={28} color={Color.primary} />
  </TouchableOpacity>
)

export default DrawerButton
