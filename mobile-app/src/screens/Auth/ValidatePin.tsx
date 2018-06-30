import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts } from '~/utils'
import DigitInput from '~/components/DigitInput'
import DigitDisplay from '~/components/DigitDisplay'

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`
const Header = Styled.Text`
  font-family: ${Fonts.header};
  color: ${Color.white};
  font-size: 28;
  margin-bottom: 30; 
`

const Spacer = Styled.View`
  flex: 1;
`

const ButtonContainer = Styled.View`
  padding-horizontal: 40;
  margin-bottom: 50;
  align-items: center;
`
const Instruction = Styled.Text`
  font-family: ${Fonts.subheader};
  color: ${Color.white};
  font-size: 18;
  margin-bottom: 30;
  line-height: 32;
  text-align: center;
`

export default ({
  code,
  isCodeValid,
  onDigit,
  onReset,
  onDelete,
  onValidatePin,
}) => (
  <Container>
    <Spacer />
    <Header>Phone Verification</Header>
    <DigitDisplay code={code} length={6} />
    <DigitInput onDigit={onDigit} onReset={onReset} onDelete={onDelete} />
    <Spacer />
    <ButtonContainer>
      <ColorButton
        color={isCodeValid ? Color.green : Color.darkPurple}
        style={{ width: 250 }}
        onClick={onValidatePin}
      >
        VERIFY PIN
      </ColorButton>
    </ButtonContainer>
  </Container>
)
