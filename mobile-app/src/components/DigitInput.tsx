import * as React from 'react'
import Styled from 'styled-components'
import { Fonts } from '~/utils'

const Container = Styled.View``

const Row = Styled.View`
  flex-direction: row;
  width: ${p => p.width};
  justify-content: space-between;
  margin-bottom: ${p => p.gap};
`
const Digit = Styled.TouchableOpacity`
  width: ${p => p.width};
  height: ${p => p.height};
  align-items: center;
  justify-content: center;
`
const DigitText = Styled.Text`
  font-family: ${Fonts.header};
  font-size: ${p => p.fontSize};
`

export default ({ width = 300, onClick }) => {
  const size = (width * 5) / 19
  const gap = (width * 2) / 19
  const fontSize = size / 2

  return (
    <Container>
      {[[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]].map(row => (
        <Row gap={gap} width={width}>
          {row.map(digit => (
            <Digit size={size} onPress={() => onClick(digit)}>
              <DigitText fontSize={fontSize}>{digit}</DigitText>
            </Digit>
          ))}
        </Row>
      ))}
    </Container>
  )
}
