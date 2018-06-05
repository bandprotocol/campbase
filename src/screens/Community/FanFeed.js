import React from 'react'
import { ScrollView } from 'react-native'
import Style from 'styled-components'
import FeedPost from '~/components/FeedPost'
import { Ionicons } from '@expo/vector-icons'

import FeedImage3Src from '~/assets/feed-image-3.jpg'
import FeedImage4Src from '~/assets/feed-image-4.jpg'
import Profile1Src from '~/assets/profile-1.jpg'
import Profile2Src from '~/assets/profile-2.jpg'

const mockPosts = [
  {
    id: 2,
    mediaSrc: FeedImage3Src,
    message: 'Thank you everyone for joining me in our concert tonight',
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

export default class CommunityFanFeedScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Fan Feed',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name="ios-chatboxes-outline" color={tintColor} size={28} />
    ),
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff' }}>
        {mockPosts.map(post => <FeedPost key={post.id} {...post} />)}
      </ScrollView>
    )
  }
}
