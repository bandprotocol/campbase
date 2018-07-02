import * as React from 'react'
import Styled from '~/styled-components'
import { autobind } from '~/utils'
import { DrawerActions } from 'react-navigation'
import { Size, Color } from '~/utils'
import { connect, StateType, Dispatch, bindActions } from '~/store'
import { PropTypes } from 'declare'
import { Drawer, DrawerNotLogin } from './Drawer'
import { logout } from '~/store/app/Auth/action'

type Props = PropTypes.withNavigation & PropTypes.withDrawer

const mapState = (state: StateType) => ({ user: state.app.User })
const mapAction = (dispatch: Dispatch) => bindActions({ logout }, dispatch)

class DrawerContainer extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>
> {
  @autobind
  goTo(path) {
    const { navigation } = this.props
    navigation.navigate(path)
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  @autobind
  async onSignOut() {
    await this.props.logout()
    this.goTo('Welcome')
  }

  render() {
    const { navigation, activeItemKey, user } = this.props

    if (activeItemKey === 'AuthStack' || activeItemKey === 'Welcome')
      return <DrawerNotLogin />

    return (
      <Drawer
        activeItemKey={activeItemKey}
        user={user}
        onSignOut={this.onSignOut}
        goTo={this.goTo}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(DrawerContainer)
