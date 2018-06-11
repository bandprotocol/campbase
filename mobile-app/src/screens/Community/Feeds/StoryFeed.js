import React from 'react'
import Style from 'styled-components'
import FeedPost from '~/components/FeedPost'
import { Ionicons } from '@expo/vector-icons'
import ScreenContainer from '~/components/ScreenContainer'

import FeedImage1Src from '~/assets/bodyslam-1.jpg'
import FeedImage2Src from '~/assets/bodyslam-2.jpg'
import ProfileBodyslamSrc from '~/assets/band-bodyslam.jpg'

const posts = [
  {
    id: 0,
    mediaSrc: FeedImage1Src,
    message: 'Thank you everyone for joining me in our concert tonight',
    user: {
      name: 'Bodyslam',
      profileImageSrc: ProfileBodyslamSrc,
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
    id: 1,
    mediaSrc: FeedImage2Src,
    message:
      'Super fun concert today. Awesome guys! Full video available now in store.',
    user: {
      name: 'Bodyslam',
      profileImageSrc: ProfileBodyslamSrc,
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

export default class CommunityStoryScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Story',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={focused ? 'ios-crop' : 'ios-crop-outline'}
        color={tintColor}
        size={28}
      />
    ),
  }

  render() {
    const { navigation } = this.props
    return (
      <ScreenContainer darkBackground scrollable>
        {posts.map(post => (
          <FeedPost key={post.id} navigation={navigation} {...post} />
        ))}
      </ScreenContainer>
    )
  }
}
