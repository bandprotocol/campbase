import * as React from 'react'
import Styled from '~/styled-components'
import { Size, Color } from '~/utils'

const ProfileSrc = require('~/assets/profile-5.jpg')

const Container = Styled.View`
  flex: 1;
  paddingTop: ${Size.statusBarHeight};
  backgroundColor: ${Color.primary};
`

const Top = Styled.View`
  height: 105;
`
const Bottom = Styled.View`
  flex: 1;
  padding-top: 75;
  align-items: center;
  backgroundColor: ${Color.paleBackground};
`
const Name = Styled.Text`
  font-weight: bold;
  font-size: 22;
  color: ${Color.primary};
  line-height: 30;
`
const Status = Styled.Text`
  font-size: 16;
  color: #999999;
`

const ProfileImage = Styled.Image`
  position: absolute;
  border-width: 16;
  border-color: #7f53ff;
  height: 120;
  width: 120;
  border-radius: 60;
  border-width: 3;
  left: 50%;
  margin-left: -60;
  top: ${Size.statusBarHeight + 43};
`
const Spacer = Styled.View`
  flex: 1;
`
const SignOut = Styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 20px;
`
const SignOutText = Styled.Text`
  color: #777777;
`
const Links = Styled.View`
  margin-top: 20;
  padding: 0px 10px;
  background-color: rgba(255,255,255,0.5);
  border-radius: 8;
  overflow: hidden;
  width: 80%;
`
const Link = Styled.TouchableOpacity`
  height: 50;
  align-items: center;
  justify-content: center;
  border-bottom-color: #eee;
  border-bottom-width: 1;
`
const LinkText = Styled.Text`
  font-size: 18;
  font-weight: ${p => (p.active ? 'bold' : 'normal')};
  color: ${Color.secondary};
  opacity: ${p => (p.active ? '1' : '0.6')};
`

export const Drawer = ({ user, activeItemKey, onSignOut, goTo }) => (
  <Container>
    <Top />
    <Bottom>
      <Name>{user.display_name}</Name>
      <Status>Loyal Member</Status>
      <Links>
        <Link onPress={() => goTo('CommunitySuggested')}>
          <LinkText active={activeItemKey === 'RootStack'}>
            Communities
          </LinkText>
        </Link>
        <Link onPress={() => goTo('Wallet')}>
          <LinkText active={activeItemKey === 'WalletStack'}>Wallet</LinkText>
        </Link>
      </Links>
      <Spacer />
      <SignOut onPress={onSignOut}>
        <SignOutText>Sign Out</SignOutText>
      </SignOut>
    </Bottom>
    <ProfileImage source={{ uri: user.profile_image }} />
  </Container>
)

export const DrawerNotLogin = () => (
  <Container>
    <Bottom>
      <Name>Hi, Stranger :)</Name>
      <Status>Please sign in</Status>
    </Bottom>
  </Container>
)
