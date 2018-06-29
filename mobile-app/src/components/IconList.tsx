import * as React from 'react'
import { Text } from 'react-native'
import Styled from '~/styled-components'
import { List } from 'antd-mobile-rn'
import { Ionicons } from '@expo/vector-icons'

const Icon = Styled.View`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`
interface TicketListProps {
  list: Array<object>
  title: string
  onItemClick?
}

export default class TicketList extends React.Component<TicketListProps> {
  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(item => (
          <List.Item
            key={item.iconName}
            arrow="horizontal"
            onClick={() => onItemClick(item)}
            thumb={
              <Icon>
                <Ionicons name={item.iconName} size={28} />
              </Icon>
            }
            multipleLine
          >
            <Text numberOfLines={1} ellipsizeMode="head">
              {item.name}
            </Text>

            <List.Item.Brief>{item.details}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
