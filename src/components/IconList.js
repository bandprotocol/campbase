import React from 'react'
import { Text } from 'react-native'
import Style from 'styled-components'
import PropTypes from 'prop-types'
import { List } from '~/antd'
import { Ionicons } from '@expo/vector-icons'

const Icon = Style.View`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`

export default class TicketList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
  }

  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(item => (
          <List.Item
            key={item.iconName}
            arrow="horizontal"
            onClick={() => onItemClick(item.id)}
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
