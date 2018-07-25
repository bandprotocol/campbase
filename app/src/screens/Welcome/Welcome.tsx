import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts } from '~/utils'

const SunSrc = require('~/assets/branding/welcome-sun.png')
const MoutainSrc = require('~/assets/branding/welcome-moutain.png')

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

const TopContainer = Styled.View`
  flex: 5;
  justify-content: flex-end;
  align-items: center;
`

const BottomContainer = Styled.View`
  flex: 4;
  width: 100%;
`

const Header = Styled.Text`
  font-family: ${Fonts.header};
  font-size: 42;
  letter-spacing: 10;
  color: #ffffff;
`
const Subheader = Styled.Text`
  font-family: ${Fonts.subheader};
  font-size: 24;
  color: #ffffff;
`
const ButtonContainer = Styled.View`
  margin-top: 60;
`

const SunImageContainer = Styled.View`
  position: absolute;
  bottom: 5%;
  left: -10%;
  width: 45%;
`
const SunImage = Styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
`

const MoutainImageContainer = Styled.View`
  position: absolute;
  bottom: -20%;
  right: -50%;
  width: 130%;
`
const MoutainImage = Styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
`

export default ({ onWallet, onExplore }) => (
  <Container>
    <TopContainer>
      <Header>CAMPBASE</Header>
      <Subheader>Decentralized Data Curation</Subheader>
      <ButtonContainer>
        <ColorButton
          color={Color.darkPurple}
          style={{ width: 220 }}
          onClick={onWallet}
        >
          SETUP WALLET
        </ColorButton>
        <ColorButton
          color="transparent"
          style={{ borderColor: '#ffffff', marginTop: 15, width: 220 }}
          onClick={onExplore}
        >
          EXPLORE
        </ColorButton>
      </ButtonContainer>
    </TopContainer>
    <BottomContainer>
      <SunImageContainer>
        <SunImage source={SunSrc} />
      </SunImageContainer>
      <MoutainImageContainer>
        <MoutainImage source={MoutainSrc} />
      </MoutainImageContainer>
    </BottomContainer>
  </Container>
)
