import * as React from 'react'
import { Text } from 'react-native'
import Styled from '~/styled-components'
import { List } from 'antd-mobile-rn'

const Date = Styled.View`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`
const DateText = Styled.Text`
  font-size: 24;
`

interface EventListProps {
  list: Array<object>
  title: string
  onItemClick?
}

export default class EventList extends React.Component<EventListProps> {
  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(event => (
          <List.Item
            key={event.name}
            arrow="horizontal"
            onClick={() => onItemClick(event.id)}
            thumb={
              <Date>
                <DateText>{event.date}</DateText>
              </Date>
            }
            multipleLine
          >
            <Text numberOfLines={1} ellipsizeMode="head">
              {event.name}
            </Text>

            <List.Item.Brief>{event.details}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
