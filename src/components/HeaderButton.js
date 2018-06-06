import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const HeaderButton = ({ name, onClick }) => (
  <TouchableOpacity onPress={onClick} style={{ marginRight: 20 }}>
    <Ionicons name={name} size={28} color="#ffffff" />
  </TouchableOpacity>
)

export default HeaderButton
