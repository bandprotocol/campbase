import * as React from 'react'
import { Text } from 'react-native'
import Style from '~/styled-components'
import { List } from 'antd-mobile-rn'

const Availability = Style.View`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`
const AvailabilityText = Style.Text`
  font-size: 20;
`
const SubtitleText = Style.Text`
  font-size: 8;
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
        {list.map(ticket => (
          <List.Item
            key={ticket.id}
            arrow="horizontal"
            onClick={() => onItemClick(ticket.id)}
            thumb={
              <Availability>
                <AvailabilityText>{ticket.availability}</AvailabilityText>
                <SubtitleText>Available</SubtitleText>
              </Availability>
            }
            multipleLine
          >
            <Text numberOfLines={1} ellipsizeMode="head">
              {ticket.name}
            </Text>

            <List.Item.Brief>{ticket.details}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
