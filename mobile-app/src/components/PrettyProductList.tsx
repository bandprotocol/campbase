import * as React from 'react'
import Styled from '~/styled-components'
import { Ionicons } from '@expo/vector-icons'

const Container = Styled.View`
  padding: 20px;
`

const Header = Styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10;
  padding-horizontal: 10;
`
const HeaderTitleText = Styled.Text`
  font-size: 22;
  flex: 1;
`
const HeaderLink = Styled.TouchableOpacity`
  margin-bottom: 5;
`
const HeaderLinkText = Styled.Text`
  color: #777777;
`

const Product = Styled.TouchableHighlight`
  position: relative;
  height: 100;
  border-radius: 8;
  margin-bottom: 10;
`
const ProductInner = Styled.View`
  flex: 1;
  justify-content: flex-end;
`
const ProductImage = Styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8;
`
const ProductName = Styled.Text`
  font-size: 18;
  color: #ffffff;
  margin-left: 15;
`
const ProductDetails = Styled.Text`
  font-size: 15;
  color: #ffffff;
  margin-left: 15;
  margin-bottom: 10;
`

interface Product {
  id
  imageSrc
  name
  details
}

interface PrettyProductListProps {
  list: Array<Product>
  title: {
    text
    linkText
    onLinkClick
  }
  onItemClick?
}

export default class PrettyProductList extends React.Component<
  PrettyProductListProps
> {
  render() {
    const { list, title, onItemClick } = this.props

    return (
      <Container>
        <Header>
          <HeaderTitleText>{title.text}</HeaderTitleText>
          {title.linkText && (
            <HeaderLink onPress={title.onLinkClick}>
              <HeaderLinkText>
                {title.linkText}{' '}
                <Ionicons name="ios-arrow-forward" color="#777777" size={14} />
              </HeaderLinkText>
            </HeaderLink>
          )}
        </Header>
        {list.map(product => (
          <Product
            key={product.id}
            onPress={() => onItemClick(product)}
            underlayColor="rgba(145, 107, 255, 0.3)"
          >
            <ProductInner>
              <ProductImage source={product.imageSrc} />
              <ProductName>{product.name}</ProductName>
              <ProductDetails>{product.details}</ProductDetails>
            </ProductInner>
          </Product>
        ))}
      </Container>
    )
  }
}
