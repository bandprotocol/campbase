import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'

import StakingTier from '~/components/StakingTier'

const Container = Style.View``

export default class CommunityServicesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Services',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name="ios-play-outline" color={tintColor} size={28} />
    ),
  }

  render() {
    return (
      <Container>
        <StakingTier />
      </Container>
    )
  }
}
