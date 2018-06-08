import React from 'react'
import Style from 'styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import { SearchBar } from '~/antd'
import CommunityList from '~/components/CommunityList'

import ProfileBodyslamSrc from '~/assets/band-bodyslam.jpg'
import ProfilePotatoSrc from '~/assets/band-potato.jpg'
import ProfileZealSrc from '~/assets/band-zeal.jpg'
import ProfileTattooSrc from '~/assets/band-tattoo.jpg'
import ProfilPlaygroundSrc from '~/assets/band-playground.jpg'

const mockCommunities = [
  {
    id: 0,
    name: 'Bodyslam',
    profileImageSrc: ProfileBodyslamSrc,
    detail: 'Rock Music, Thailand',
  },
  {
    id: 1,
    name: 'Potato',
    profileImageSrc: ProfilePotatoSrc,
    detail: 'Rock Music, Thailand',
  },
  {
    id: 2,
    name: 'Zeal',
    profileImageSrc: ProfileZealSrc,
    detail: 'Rock Music, Thailand',
  },
  {
    id: 3,
    name: 'Tattwo Colour',
    profileImageSrc: ProfileTattooSrc,
    detail: 'Pop Music, Thailand',
  },
  {
    id: 4,
    name: 'Playground',
    profileImageSrc: ProfilPlaygroundSrc,
    detail: 'Pop Music, Thailand',
  },
]

export default class CommunityBrowseScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Browse' }

  render() {
    const { navigation } = this.props
    return (
      <ScreenContainer scrollable noPadding>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
        <CommunityList
          list={mockCommunities}
          onItemClick={id => navigation.replace('CommunityTab')}
        />
      </ScreenContainer>
    )
  }
}
