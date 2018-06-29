import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts } from '~/utils'
import DigitInput from '~/components/DigitInput'

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

export default ({ code }) => (
  <Container>
    <DigitInput />
  </Container>
)
