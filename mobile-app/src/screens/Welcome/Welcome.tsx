import * as React from 'react'
import Style from '~/styled-components'
import { Button } from 'antd-mobile-rn'
import { Color } from '~/utils'

const SunSrc = require('~/assets/branding/welcome-sun.png')
const MoutainSrc = require('~/assets/branding/welcome-moutain.png')

const Container = Style.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

const TopContainer = Style.View`
  flex: 3;
  justify-content: flex-end;
`

const BottomContainer = Style.View`
  flex: 2;
  justify-content: flex-start;
`

const ButtonContainer = Style.View`

`
const Header = Style.Text`

`
const Subheader = Style.Text`

`

const SunImage = Style.Image`

`

const MoutainImage = Style.Image`

`

export default ({ onLogin, onSignUp }) => (
  <Container>
    <TopContainer>
      <Header>CAMPBASE</Header>
      <Subheader>curate you communities</Subheader>
      <ButtonContainer>
        <Button onClick={onSignUp}>Sign Up!</Button>
        <Button onClick={onLogin}>Sign In!</Button>
      </ButtonContainer>
    </TopContainer>
    <BottomContainer>
      <SunImage source={SunSrc} />
      <MoutainImage source={MoutainSrc} />
    </BottomContainer>
  </Container>
)
