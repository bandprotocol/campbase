import React from 'react'
import Style from 'styled-components'
import { View } from 'react-native'
import { SearchBar } from '~/antd'
import CommunityList from '~/components/CommunityList'

const RecommendationList = [
  {
    categoryName: 'Following',
    communities: [
      {
        id: 0,
        name: 'Bodyslam',
        detail: 'Rock Music, Thailand',
      },
      {
        id: 1,
        name: 'Potato',
        detail: 'Rock Music, Thailand',
      },
      {
        id: 2,
        name: 'Zeal',
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
        detail: 'Pop Music',
      },
      {
        id: 4,
        name: 'Playground',
        detail: 'Pop Music',
      },
    ],
  },
]

export default class CommunityBrowseScreen extends React.Component {
  static navigationOptions = { tabBarLabel: 'Browse' }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <SearchBar placeholder="Search" cancelText="Cancel" maxLength={8} />
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
