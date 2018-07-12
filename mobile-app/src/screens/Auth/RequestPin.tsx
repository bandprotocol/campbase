import * as React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts } from '~/utils'
import PhoneInput from 'react-native-phone-input'

const PaperPlaneSrc = require('~/assets/images/paper-plane.png')

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
  height: 80;
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
const PhoneInputContainer = Styled.View`
  background: ${Color.white};
  border-radius: 6;
  width: 280;
  padding-horizontal: 20;
  padding-vertical: 15;
  margin-top: 20;
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
  isValidNumber,
  onChangePhoneNumber,
  onRequestPin,
  refPhoneNumberPicker,
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <Container>
      <Spacer />
      <Form>
        <Image source={PaperPlaneSrc} />
        <Header>Phone Verification</Header>
        <PhoneInputContainer>
          <PhoneInput
            onChangePhoneNumber={onChangePhoneNumber}
            textStyle={{
              fontSize: 20,
              color: Color.darkPurple,
            }}
            offset={20}
            ref={refPhoneNumberPicker}
          />
        </PhoneInputContainer>
      </Form>
      <Spacer />
      <ButtonContainer>
        <Instruction>
          We are sending you a 6-digits secret code. Don't lose it!
        </Instruction>
        <ColorButton
          color={isValidNumber ? Color.green : Color.darkPurple}
          style={{ width: 250 }}
          onClick={onRequestPin}
        >
          REQUEST PIN
        </ColorButton>
      </ButtonContainer>
    </Container>
  </TouchableWithoutFeedback>
)
