import * as React from 'react'
import Style from '~/styled-components'
import { List } from 'antd-mobile-rn'

const ProfileImage = Style.Image`
  height: 40;
  width: 40;
  border-radius: 4;
  margin-right: 10;
`

interface Product {
  id
  name
  imageSrc
  details
  extra
}

interface ProductListProps {
  title: string
  list: Array<Product>
  onItemClick?
}

export default class ProductList extends React.Component<ProductListProps> {
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
