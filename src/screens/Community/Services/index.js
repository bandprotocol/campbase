import React from 'react'
import Style from 'styled-components'
import { Ionicons } from '@expo/vector-icons'

import StakingTier from '~/components/StakingTier'
import IconList from '~/components/IconList'

const Container = Style.View``

const services = [
  {
    name: 'Music Albums',
    details: '10 Available',
    iconName: 'ios-play',
  },
  {
    name: 'Photo Books',
    details: '27 Available',
    iconName: 'ios-camera',
  },
  {
    name: 'Video Series',
    details: '10 Available',
    iconName: 'ios-film',
  },
  {
    name: 'Downloads',
    details: '10 Available',
    iconName: 'ios-download',
  },
]

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
        <IconList list={services} onItemClick={() => false} />
      </Container>
    )
  }
}
