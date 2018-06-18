import * as React from 'react'
import { withNavigationProps, withDraweProps } from '~/declare'
import Style from '~/styled-components'
import { DrawerActions } from 'react-navigation'
import { Size, Color } from '~/utils'

import * as ProfileSrc from '~/assets/profile-5.jpg'

const Container = Style.View`
  flex: 1;
  paddingTop: ${Size.statusBarHeight};
  backgroundColor: ${Color.primary};
`

const Top = Style.View`
  height: 105;
`
const Bottom = Style.View`
  flex: 1;
  padding-top: 75;
  align-items: center;
  backgroundColor: ${Color.paleBackground};
`
const Name = Style.Text`
  font-weight: bold;
  font-size: 22;
  color: ${Color.primary};
  line-height: 26;
`
const Status = Style.Text`
  font-size: 16;
  color: #777777;
`

const ProfileImage = Style.Image`
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
const Spacer = Style.View`
  flex: 1;
`
const SignOut = Style.TouchableOpacity`
  padding: 20px;
  margin-bottom: 20px;
`
const SignOutText = Style.Text`
  color: #777777;
`
const Links = Style.View`
  margin-top: 20;
  padding: 0px 10px;
  background-color: rgba(255,255,255,0.5);
  border-radius: 8;
  overflow: hidden;
  width: 80%;
`
const Link = Style.TouchableOpacity`
  height: 50;
  align-items: center;
  justify-content: center;
  border-bottom-color: #eee;
  border-bottom-width: 1;
`
const LinkText = Style.Text`
  font-size: 18;
  font-weight: ${p => (p.active ? 'bold' : 'normal')};
  color: ${Color.secondary};
  opacity: ${p => (p.active ? '1' : '0.6')};
`

export default class Drawer extends React.Component<
  withNavigationProps & withDraweProps
> {
  goTo(path) {
    const { navigation } = this.props
    navigation.navigate(path)
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    const { navigation, activeItemKey } = this.props

    if (activeItemKey === 'AuthTab')
      return (
        <Container>
          <Bottom>
            <Name>Hi, Stranger :)</Name>
            <Status>Please sign in</Status>
          </Bottom>
        </Container>
      )

    return (
      <Container>
        <Top />
        <Bottom>
          <Name>Maddy Belle</Name>
          <Status>Super Member</Status>
          <Links>
            <Link onPress={() => this.goTo('CommunitySuggested')}>
              <LinkText active={activeItemKey === 'RootStack'}>
                Communities
              </LinkText>
            </Link>
            <Link onPress={() => this.goTo('Wallet')}>
              <LinkText active={activeItemKey === 'WalletStack'}>
                Wallet
              </LinkText>
            </Link>
          </Links>
          <Spacer />
          <SignOut onPress={() => this.goTo('SignIn')}>
            <SignOutText>Sign Out</SignOutText>
          </SignOut>
        </Bottom>
        <ProfileImage source={ProfileSrc} />
      </Container>
    )
  }
}
