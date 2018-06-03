import React from 'react'
import { Text } from 'react-native'
import Style from 'styled-components'
import PropTypes from 'prop-types'
import { List } from '~/antd'

const Date = Style.View`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`
const DateText = Style.Text`
  font-size: 24;
`

export default class CommunityList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
  }

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
