import React from 'react'
import { Text } from 'react-native'
import Style from 'styled-components'
import PropTypes from 'prop-types'
import { List } from '~/antd'

const Title = Style.View`
  height: 40;
  width: 80;
  border-radius: 4;
  margin-right: 10;
  padding-horizontal: 10;
  justify-content: center;
`
const TitleText = Style.Text`
  font-size: 15;
  font-weight: 500;
`

export default class TitledList extends React.Component {
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
            key={item.title}
            onClick={() => onItemClick(item.title)}
            thumb={
              <Title>
                <TitleText>{item.title}</TitleText>
              </Title>
            }
            multipleLine
          >
            <Text>{item.detail}</Text>
          </List.Item>
        ))}
      </List>
    )
  }
}
