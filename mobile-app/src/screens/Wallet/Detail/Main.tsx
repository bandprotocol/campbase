import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts, Size } from '~/utils'
import Prompt from 'rn-prompt'
import * as QRCode from 'react-native-qrcode'

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
  margin-top: 15;
`
const SubHeader = Styled.Text`
  font-family: ${Fonts.subheader};
  color: ${Color.white};
  font-size: 20;
  line-height: 30;
  margin-top: 15;
  margin-horizontal: 50;
  text-align: center;
  margin-bottom: 30;
`
const QRContainer = Styled.View`
  height: 300;
  width: 300;
  align-items: center;
  justify-content: center;
  background-color: ${Color.white};
  border-radius: 8;
`

const ButtonContainer = Styled.View`
  padding-horizontal: 40;
  margin-bottom: 50;
  align-items: center;
`
const ButtonSpacer = Styled.View`
  height: 15;
`

export default ({
  wallet,
  balance,
  promptPasscodeVisible,
  onSendBand,
  onMintBand,
  onCancelPromptPasscode,
  onSubmitPromptPasscode,
}) => (
  <Container>
    <Spacer />

    <Form>
      <QRContainer>
        <QRCode
          size={250}
          value={wallet.address}
          bgColor={Color.darkPurple}
          fgColor={Color.white}
        />
      </QRContainer>
      <Header>
        {typeof balance === null ? 'Loading Balance' : `${balance} BUN`}
      </Header>
      <SubHeader>Address: #{wallet.address}</SubHeader>
    </Form>
    <Spacer />

    <ButtonContainer>
      <ColorButton
        color={Color.green}
        style={{ width: 250 }}
        onClick={onSendBand}
      >
        SEND BAND
      </ColorButton>
      <ButtonSpacer />
      <ColorButton
        color={Color.darkPurple}
        style={{ width: 250 }}
        onClick={onMintBand}
      >
        MINT BAND
      </ColorButton>
    </ButtonContainer>

    <Prompt
      title="Wallet Passcode"
      placeholder="Type here"
      defaultValue=""
      visible={promptPasscodeVisible}
      onCancel={onCancelPromptPasscode}
      onSubmit={onSubmitPromptPasscode}
    />
  </Container>
)
