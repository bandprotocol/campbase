import * as React from 'react'
import { TouchableOpacity, GestureResponderEvent } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Color } from '~/utils'

const HeaderButton = ({
  name,
  onClick,
  content,
}: {
  name?: string
  onClick: (event: GestureResponderEvent) => void
  content?
}) => (
  <TouchableOpacity onPress={onClick} style={{ marginRight: 20 }}>
    {name ? <Ionicons name={name} size={28} color={Color.primary} /> : content}
  </TouchableOpacity>
)

export default HeaderButton
