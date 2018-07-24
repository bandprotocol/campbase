import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts, Size } from '~/utils'
import MnemonicPanel from '~/components/MnemonicPanel'

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
  padding-top: ${Size.statusAndHeaderHeight};
`

const Spacer = Styled.View`
  flex: 1;
`

const Form = Styled.View`
  align-items: center;
`
const Header = Styled.Text`
  font-family: ${Fonts.header};
  color: ${Color.white};
  font-size: 32;
`
const SubHeader = Styled.Text`
  font-family: ${Fonts.subheader};
  color: ${Color.white};
  font-size: 20;
  line-height: 30;
  margin-top: 20;
  margin-horizontal: 30;
  text-align: center;
  margin-bottom: 30;
`

const ButtonContainer = Styled.View`
  padding-horizontal: 40;
  margin-bottom: 50;
  align-items: center;
`

const PasscodeContainer = Styled.View`
  background: ${Color.white};
  border-radius: 6;
  width: 280;
  padding-horizontal: 20;
  padding-vertical: 10;
  margin-top: 20;
`
const Passcode = Styled.TextInput`
  color: ${Color.darkPurple};
  font-size: 18px;
`

export default ({ passcode, onPasscodeChange, onPasscodeConfirm }) => (
  <Container>
    <Spacer />
    <Form>
      <Header>Confirm Passcode</Header>
      <PasscodeContainer>
        <Passcode
          placeholder="Enter Passcode Again"
          textAlign="center"
          secureTextEntry={true}
          placeholderTextColor={Color.purple}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={onPasscodeChange}
          value={passcode}
        />
      </PasscodeContainer>
    </Form>
    <Spacer />
    <ButtonContainer>
      <ColorButton
        color={Color.green}
        style={{ width: 250 }}
        onClick={onPasscodeConfirm}
      >
        SET PASSCODE
      </ColorButton>
    </ButtonContainer>
  </Container>
)
