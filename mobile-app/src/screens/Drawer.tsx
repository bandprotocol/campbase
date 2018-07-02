import * as React from 'react'
import Styled from '~/styled-components'
import { DrawerActions } from 'react-navigation'
import { Size, Color } from '~/utils'
import { connect } from '~/store'
import { PropTypes } from 'declare'

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
  line-height: 26;
`
const Status = Styled.Text`
  font-size: 16;
  color: #777777;
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

const mapState = state => ({ user: state.app.User })

class Drawer extends React.Component<
  PropTypes.withNavigation & PropTypes.withDrawer & ReturnType<typeof mapState>
> {
  goTo(path) {
    const { navigation } = this.props
    navigation.navigate(path)
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    const { navigation, activeItemKey, user } = this.props

    if (activeItemKey === 'AuthStack' || activeItemKey === 'Welcome')
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
          <Name>{user.display_name}</Name>
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
        <ProfileImage source={{ url: user.profile_image }} />
      </Container>
    )
  }
}

export default connect(mapState)(Drawer)
