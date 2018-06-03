import React from 'react'
import Style from 'styled-components'
import { View } from 'react-native'
import CommunityList from '~/components/CommunityList'

import ProfileBodyslamSrc from '~/assets/band-bodyslam.jpg'
import ProfilePotatoSrc from '~/assets/band-potato.jpg'
import ProfileZealSrc from '~/assets/band-zeal.jpg'
import ProfileTattooSrc from '~/assets/band-tattoo.jpg'
import ProfilPlaygroundSrc from '~/assets/band-playground.jpg'

const RecommendationList = [
  {
    categoryName: 'Following',
    communities: [
      {
        id: 0,
        name: 'Bodyslam',
        profileImageSrc: ProfileBodyslamSrc,
        tags: 'Rock Music, Thailand',
      },
      {
        id: 1,
        name: 'Potato',
        profileImageSrc: ProfilePotatoSrc,
        tags: 'Rock Music, Thailand',
      },
      {
        id: 2,
        name: 'Zeal',
        profileImageSrc: ProfileZealSrc,
        tags: 'Rock Music, Thailand',
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
        tags: 'Pop Music',
      },
      {
        id: 4,
        name: 'Playground',
        profileImageSrc: ProfilPlaygroundSrc,
        tags: 'Pop Music',
      },
    ],
  },
]

export default class CommunitySuggestedScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Suggested' }

  render() {
    const { navigation } = this.props
    return (
      <View>
        {RecommendationList.map(category => (
          <CommunityList
            key={category.categoryName}
            title={category.categoryName}
            list={category.communities}
            onItemClick={id => navigation.replace('CommunityTab')}
          />
        ))}
      </View>
    )
  }
}
