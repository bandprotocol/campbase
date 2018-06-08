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

export default class ProductList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        imageSrc: PropTypes.any,
        extra: PropTypes.object,
      })
    ).isRequired,
  }

  render() {
    const { list, title, onItemClick } = this.props

    return (
      <List renderHeader={() => title}>
        {list.map(product => (
          <List.Item
            key={product.name}
            arrow={product.extra ? undefined : 'horizontal'}
            extra={product.extra}
            onClick={() => onItemClick(product)}
            thumb={<ProfileImage source={product.imageSrc} />}
            multipleLine
          >
            {product.name}
            <List.Item.Brief>{product.detail}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
