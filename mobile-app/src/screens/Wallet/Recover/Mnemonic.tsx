import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts, Size } from '~/utils'
import MnemonicPanel from '~/components/MnemonicPanel'
import Prompt from 'rn-prompt'

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
  margin-bottom: 20;
`

const ButtonContainer = Styled.View`
  padding-horizontal: 40;
  margin-bottom: 50;
  align-items: center;
`

export default ({
  mnemonic,
  triggerPrompt,
  onRecover,
  mnemonicPromptIndex,
  onCancelPrompt,
  onSubmitPrompt,
}) => (
  <Container>
    <Spacer />
    <Form>
      <Header>Recovery Words</Header>
      <MnemonicPanel mnemonic={mnemonic} onWordClick={triggerPrompt} />
    </Form>
    <Spacer />

    {!mnemonic.some(v => !v) && (
      <ButtonContainer>
        <ColorButton
          color={Color.green}
          style={{ width: 250 }}
          onClick={onRecover}
        >
          SET PASSCODE
        </ColorButton>
      </ButtonContainer>
    )}

    <Prompt
      title={`Word #${mnemonicPromptIndex + 1}`}
      placeholder="Type here"
      defaultValue={mnemonic[mnemonicPromptIndex || 0]}
      visible={mnemonicPromptIndex !== null}
      onCancel={onCancelPrompt}
      onSubmit={onSubmitPrompt}
    />
  </Container>
)
