import * as React from 'react'
import Style from '~/styled-components'
import { List } from 'antd-mobile-rn'

const ProfileImage = Style.Image`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
`

interface CommunityListProps {
  title: string
  list?: Array<{ id; name; detail; profileImageSrc }>
  onItemClick?
}

export default class CommunityList extends React.Component<CommunityListProps> {
  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(community => (
          <List.Item
            key={community.name}
            arrow="horizontal"
            onClick={() => onItemClick(community.id)}
            thumb={<ProfileImage source={community.profileImageSrc} />}
            multipleLine
          >
            {community.name}
            <List.Item.Brief>{community.detail}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
