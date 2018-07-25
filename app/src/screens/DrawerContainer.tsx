import * as React from 'react'
import { autobind } from '~/utils'
import { DrawerActions } from 'react-navigation'
import { connect, StateType, Dispatch, bindActions } from '~/store'
import { PropTypes } from 'declare'
import { Drawer, DrawerNotLogin } from './Drawer'

type Props = PropTypes.withNavigation & PropTypes.withDrawer

const mapState = (state: StateType) => ({})
const mapAction = (dispatch: Dispatch) => bindActions({}, dispatch)

class DrawerContainer extends React.Component<
  Props & ReturnType<typeof mapState> & ReturnType<typeof mapAction>
> {
  @autobind
  goTo(path) {
    const { navigation } = this.props
    navigation.navigate(path)
    navigation.dispatch(DrawerActions.closeDrawer())
  }
  render() {
    const { navigation, activeItemKey } = this.props

    if (activeItemKey === 'AuthStack' || activeItemKey === 'Welcome')
      return <DrawerNotLogin />

    return (
      <Drawer
        activeItemKey={activeItemKey}
        user={{
          display_name: 'John Legend',
          profile_image: 'https://api.adorable.io/avatars/300/0@adorable.png',
        }}
        onSignOut={() => false}
        goTo={this.goTo}
      />
    )
  }
}

export default connect(
  mapState,
  mapAction
)(DrawerContainer)
