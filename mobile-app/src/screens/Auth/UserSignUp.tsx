import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts } from '~/utils'

const SignupDoneSrc = require('~/assets/images/signup-done.png')

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

const Spacer = Styled.View`
  flex: 1;
`

const Form = Styled.View`
  align-items: center;
`
const Image = Styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 120;
  height: 120;
  margin-bottom: 30;
`
const Header = Styled.Text`
  font-family: ${Fonts.header};
  color: ${Color.white};
  font-size: 28;
`

const ButtonContainer = Styled.View`
  padding-horizontal: 40;
  margin-bottom: 50;
  align-items: center;
`
const InputContainer = Styled.View`
  background: ${Color.white};
  border-radius: 6;
  width: 280;
  padding-horizontal: 20;
  padding-vertical: 10;
  margin-top: 20;
`
const Input = Styled.TextInput`
  color: ${Color.darkPurple};
  font-size: 18px;
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
  isValidInfo,
  email,
  displayName,
  onEmailChange,
  onDisplayNameChange,
  onSignUp,
}) => (
  <Container>
    <Spacer />
    <Form>
      <Image source={SignupDoneSrc} />
      <Header>Setup Your New Account</Header>
      <InputContainer>
        <Input
          placeholder="Display name"
          placeholderTextColor={Color.purple}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={onDisplayNameChange}
          value={displayName}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Email"
          placeholderTextColor={Color.purple}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={onEmailChange}
          value={email}
        />
      </InputContainer>
    </Form>
    <Spacer />
    <ButtonContainer>
      <Instruction>
        You need to verify your email before using the wallet features
      </Instruction>
      <ColorButton
        color={isValidInfo ? Color.green : Color.darkPurple}
        style={{ width: 250 }}
        onClick={onSignUp}
      >
        SIGN UP
      </ColorButton>
    </ButtonContainer>
  </Container>
)
