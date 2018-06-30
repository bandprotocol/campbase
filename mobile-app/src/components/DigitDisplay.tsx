import * as React from 'react'
import Styled from 'styled-components'
import { Fonts, Color } from '~/utils'
import { Ionicons } from '@expo/vector-icons'

const Container = Styled.View`
  width: ${p => p.width};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50;
`

const Digit = Styled.View`
  align-items: center;
  border-bottom-color: ${Color.white};
  border-bottom-width: 2;
  height: ${p => p.size * 1.8};
  width: ${p => p.size};
`
const DigitText = Styled.Text`
  font-family: ${Fonts.header};
  text-align: center;
  align-self: center;
  color: ${Color.white};
  font-size: ${p => p.size};
`

export default ({ width = 280, code = [], length }) => {
  const size = width / (length + 2)

  return (
    <Container width={width}>
      {[...code, ...Array(length - code.length)].map((digit, i) => (
        <Digit key={`${i}-${digit}`} size={size}>
          <DigitText size={size}>{digit}</DigitText>
        </Digit>
      ))}
    </Container>
  )
}
