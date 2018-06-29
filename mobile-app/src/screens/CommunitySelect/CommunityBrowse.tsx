import * as React from 'react'
import { PropTypes } from '~/declare'
import Styled from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import { SearchBar } from 'antd-mobile-rn'
import CommunityList from '~/components/CommunityList'

const ProfileBodyslamSrc = require('~/assets/band-bodyslam.jpg')
const ProfilePotatoSrc = require('~/assets/band-potato.jpg')
const ProfileZealSrc = require('~/assets/band-zeal.jpg')
const ProfileTattooSrc = require('~/assets/band-tattoo.jpg')
const ProfilPlaygroundSrc = require('~/assets/band-playground.jpg')

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

export default class CommunityBrowseScreen extends React.Component<
  PropTypes.withNavigation
> {
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
