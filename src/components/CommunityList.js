import React from 'react'
import Style from 'styled-components'
import PropTypes from 'prop-types'
import { List } from '~/antd'

const ProfileImage = Style.Image`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
`

export default class CommunityList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        profileImageSrc: PropTypes.any,
      })
    ).isRequired,
  }

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
