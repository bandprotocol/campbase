import * as React from 'react'
import { withNavigationProps } from '~/declare'
import { ScrollView } from 'react-native'
import Style from '~/styled-components'
import FeedPost from '~/components/FeedPost'
import ScreenContainer from '~/components/ScreenContainer'
import { Ionicons } from '@expo/vector-icons'

import * as FeedImage3Src from '~/assets/bodyslam-3.jpg'
import * as FeedImage4Src from '~/assets/bodyslam-4.jpg'
import * as Profile1Src from '~/assets/profile-1.jpg'
import * as Profile2Src from '~/assets/profile-2.jpg'

const mockPosts = [
  {
    id: 2,
    mediaSrc: FeedImage3Src,
    message:
      'What a pleasant surprise! P’Toon just gave me VIP concert ticket for free. God bless him.',
    user: {
      name: 'John Olive',
      profileImageSrc: Profile1Src,
    },
    stars: 863,
    comments: [
      {
        id: 1,
        user: {
          name: 'James Watt',
        },
        message: 'Awesome event!',
        stars: 98,
      },
      {
        id: 2,
        user: {
          name: 'Stephen Young',
        },
        message: 'Great job guys',
        stars: 63,
      },
      {
        id: 3,
        user: {
          name: 'John Nash',
        },
        message: "Keep it up! We're rooting for you as always",
        stars: 58,
      },
    ],
  },
  {
    id: 3,
    mediaSrc: FeedImage4Src,
    message:
      'Super fun concert today. Awesome guys! Full video available now in store.',
    user: {
      name: 'Josh Grey',
      profileImageSrc: Profile2Src,
    },
    stars: 145,
    comments: [
      {
        id: 1,
        user: {
          name: 'James Watt',
        },
        message: 'Awesome event!',
        stars: 98,
      },
      {
        id: 2,
        user: {
          name: 'John Young',
        },
        message: 'Great day to be alive!',
        stars: 63,
      },
      {
        id: 3,
        user: {
          name: 'Chicago Guy',
        },
        message: 'Awesome job :D',
        stars: 58,
      },
    ],
  },
]

const Container = Style.View`
  flex: 1;
  background: #ffffff;
`

export default class CommunityFanFeedScreen extends React.Component<
  withNavigationProps
> {
  static navigationOptions = {
    tabBarLabel: 'Fan Feed',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
        color={tintColor}
        size={28}
      />
    ),
  }

  render() {
    const { navigation } = this.props

    return (
      <ScreenContainer darkBackground scrollable>
        {mockPosts.map(post => (
          <FeedPost key={post.id} navigation={navigation} {...post} />
        ))}
      </ScreenContainer>
    )
  }
}
