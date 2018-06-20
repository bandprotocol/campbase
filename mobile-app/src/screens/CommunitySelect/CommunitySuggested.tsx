import * as React from 'react'
import { withNavigationProps } from '~/declare'
import Style from '~/styled-components'
import ScreenContainer from '~/components/ScreenContainer'
import CommunityList from '~/components/CommunityList'

const ProfileBodyslamSrc = require('~/assets/band-bodyslam.jpg')
const ProfilePotatoSrc = require('~/assets/band-potato.jpg')
const ProfileZealSrc = require('~/assets/band-zeal.jpg')
const ProfileTattooSrc = require('~/assets/band-tattoo.jpg')
const ProfilPlaygroundSrc = require('~/assets/band-playground.jpg')

const Category = Style.View`
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 8;
  overflow: hidden;
`

const RecommendationList = [
  {
    categoryName: 'Following',
    communities: [
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
    ],
  },
  {
    categoryName: "Thailand's Top Influencers",
    communities: [
      {
        id: 3,
        name: 'Tattwo Colour',
        profileImageSrc: ProfileTattooSrc,
        detail: 'Pop Music',
      },
      {
        id: 4,
        name: 'Playground',
        profileImageSrc: ProfilPlaygroundSrc,
        detail: 'Pop Music',
      },
    ],
  },
]

export default class CommunitySuggestedScreen extends React.Component<
  withNavigationProps
> {
  static navigationOptions = { tabBarLabel: 'Suggested' }

  render() {
    const { navigation } = this.props
    return (
      <ScreenContainer scrollable noPadding darkBackground>
        {RecommendationList.map(category => (
          <Category key={category.categoryName}>
            <CommunityList
              title={category.categoryName}
              list={category.communities}
              onItemClick={id => navigation.replace('CommunityTab')}
            />
          </Category>
        ))}
      </ScreenContainer>
    )
  }
}