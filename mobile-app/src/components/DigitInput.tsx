import * as React from 'react'
import Styled from 'styled-components'
import { Fonts, Color } from '~/utils'
import { Ionicons } from '@expo/vector-icons'

const Container = Styled.View``

const Row = Styled.View`
  flex-direction: row;
  width: ${p => p.width};
  justify-content: space-between;
  margin-bottom: ${p => p.gap};
`
const Digit = Styled.TouchableOpacity`
  width: ${p => p.size};
  height: ${p => p.size};
  align-items: center;
  justify-content: center;
  border-radius: ${p => p.size / 8};
  border-color: #ffffff;
  border-width: ${p => (p.noBorder ? 0 : 2)};
`
const DigitText = Styled.Text`
  font-family: ${Fonts.header};
  font-size: ${p => p.fontSize};
  line-height: ${p => p.fontSize};
  color: ${Color.white};
  align-self: center;
  margin-bottom: 0;
`

export default ({ width = 210, onDigit, onReset, onDelete }) => {
  const size = (width * 3) / 11
  const gap = (width * 1) / 11
  const fontSize = size / 2

  return (
    <Container>
      {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, ir) => (
        <Row key={ir} gap={gap} width={width}>
          {row.map(digit => (
            <Digit
              key={digit}
              size={size}
              onPress={() => onDigit(digit)}
              highlight
            >
              <DigitText fontSize={fontSize}>{digit}</DigitText>
            </Digit>
          ))}
        </Row>
      ))}
      <Row gap={gap} width={width}>
        <Digit size={size} onPress={onReset} noBorder>
          <Ionicons
            name="ios-refresh"
            size={fontSize * 1.5}
            color={Color.white}
          />
        </Digit>
        <Digit size={size} onPress={() => onDigit(0)} highlight>
          <DigitText fontSize={fontSize}>0</DigitText>
        </Digit>
        <Digit size={size} onPress={onDelete} noBorder>
          <Ionicons
            name="ios-backspace"
            size={fontSize * 1.3}
            color={Color.white}
          />
        </Digit>
      </Row>
    </Container>
  )
}
