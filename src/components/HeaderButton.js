import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Color from '~/color'

const HeaderButton = ({ name, onClick, content }) => (
  <TouchableOpacity onPress={onClick} style={{ marginRight: 20 }}>
    {name ? <Ionicons name={name} size={28} color={Color.primary} /> : content}
  </TouchableOpacity>
)

export default HeaderButton
