import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts, Size } from '~/utils'

const WalletSrc = require('~/assets/images/wallet.png')

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
const Image = Styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 180;
  height: 160;
  margin-bottom: 30;
`
const Header = Styled.Text`
  font-family: ${Fonts.header};
  color: ${Color.white};
  font-size: 28;
`
const SubHeader = Styled.Text`
  font-family: ${Fonts.subheader};
  color: ${Color.white};
  font-size: 20;
  line-height: 30;
  margin-top: 20;
  margin-horizontal: 30;
  text-align: center;
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

export default ({ onCreateWallet }) => (
  <Container>
    <Spacer />
    <Form>
      <Image source={WalletSrc} />
      <Header>Keep Your Tokens Safe</Header>
      <SubHeader>
        Campbase wallet offers maximum security. Yet it's so easy your mom can
        use.
      </SubHeader>
    </Form>
    <Spacer />
    <ButtonContainer>
      <ColorButton
        color={Color.green}
        style={{ width: 250 }}
        onClick={onCreateWallet}
      >
        CREATE WALLET
      </ColorButton>
    </ButtonContainer>
  </Container>
)
