import * as React from 'react'
import Styled from '~/styled-components'
import { autobind } from '~/utils'
import { DrawerActions } from 'react-navigation'
import { Size, Color } from '~/utils'
import { connect } from '~/store'
import { PropTypes } from 'declare'
import { Drawer, DrawerNotLogin } from './Drawer'

const mapState = state => ({ user: state.app.User })

class DrawerContainer extends React.Component<
  PropTypes.withNavigation & PropTypes.withDrawer & ReturnType<typeof mapState>
> {
  @autobind
  goTo(path) {
    const { navigation } = this.props
    navigation.navigate(path)
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  @autobind
  onSignOut() {
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
      />
    )
  }
}

export default connect(mapState)(DrawerContainer)
