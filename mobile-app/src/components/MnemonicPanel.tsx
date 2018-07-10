import * as React from 'react'
import Styled from '~/styled-components'
import { Color, Fonts, Size } from '~/utils'

const Container = Styled.View`
  padding: 12px;
`

const Row = Styled.View`
  width: 100%;
  margin-bottom: 8;
  flex-direction: row;
`

const Item = Styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  background-color: ${Color.darkPurple};
  border-radius: 6;
  padding-horizontal: 6;
  padding-vertical: 10;
  margin-horizontal: 8;
  margin-bottom: 7;
  align-items: center;
`
const ItemId = Styled.Text`
  width: 20;
  color: ${Color.white};
  text-align: center;
  font-size: 15;
  margin-right: 8;
`
const ItemWord = Styled.Text`
  flex: 1;
  color: ${Color.white};
  font-size: 16;
`

const toChunkOf3 = (arr: string[]): string[][] => {
  return [...Array(arr.length / 3)].map((_, i) => arr.slice(3 * i, 3 * (i + 1)))
}

export default ({
  mnemonic,
  onWordClick = () => false,
}: {
  mnemonic: string[]
  onWordClick?: Function
}) => (
  <Container>
    {toChunkOf3(mnemonic).map((chunk, row) => (
      <Row key={row}>
        {chunk.map((word, column) => (
          <Item key={column} onPress={() => onWordClick(row * 3 + column)}>
            <ItemId>{row * 3 + column + 1}</ItemId>
            <ItemWord>{word}</ItemWord>
          </Item>
        ))}
      </Row>
    ))}
  </Container>
)
