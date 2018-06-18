import * as React from 'react'
import PropTypes from 'prop-types'
import Style from '~/styled-components'
import { List } from 'antd-mobile-rn'

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
const Text = Style.Text``

interface TitledListProps {
  title: string
  list: Array<{ title; detail }>
  onItemClick?
}

export default class TitledList extends React.Component<TitledListProps> {
  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(item => (
          <List.Item
            key={item.title}
            onClick={() => onItemClick(item)}
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
