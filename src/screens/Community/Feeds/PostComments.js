import React from 'react'
import { StatusBar } from 'react-native'
import Style from 'styled-components'
import { Button, TextareaItem, Switch, Stepper } from '~/antd'
import { Color } from '~/utils'
import { Ionicons } from '@expo/vector-icons'
import ScreenContainer from '~/components/ScreenContainer'

import FeedPostComment from '~/components/FeedPostComment'

import Profile1Src from '~/assets/profile-1.jpg'
import Profile2Src from '~/assets/profile-2.jpg'
import Profile3Src from '~/assets/profile-3.jpg'
import Profile4Src from '~/assets/profile-4.jpg'
import Profile5Src from '~/assets/profile-5.jpg'

const KeyboardAvoidingContainer = Style.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  flex: 1;
  background-color: #ffffff;
`

const CommentContainer = Style.ScrollView`
  flex: 1;
`

const Comments = Style.View`
  padding-top: 10;
  padding-bottom: 10;
  background-color: ${Color.paleBackground};
`

const Spacer = Style.View`
  width: 100%;
  height: 3;
  background-color: #c4afff;
`

const RankedComments = Style.View`
  padding-top: 10;
  padding-bottom: 10;
`

const NewCommentContainer = Style.View`
  background-color: #efefef;
  flex-shrink: 0;
  padding: 10px;
`
const BoostContainer = Style.View`
  flex-direction: row;
  padding-bottom: 8px;
  align-items: center;
`
const BoostText = Style.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 16;
`
const InputContainer = Style.View`
  flex-direction: row;
  
`
const TextareaContainer = Style.View`
  flex: 1;
`
const PostButton = Style.View`
  padding-horizontal: 10;
`
const PostButtonText = Style.Text`
  font-size: 18;
  font-weight: bold;
  color: ${Color.primary};
`
const BoostAmount = Style.View`
  flex-direction: row;
  flex: 1;
  margin-right: 60;
  align-items: center;
  justify-content: flex-end;
`

const mockPostComments = [
  {
    id: 1,
    user: {
      name: 'James Watt',
      profileImageSrc: Profile1Src,
    },
    message: 'Awesome event!',
    stars: 98,
    time: '3h ago',
  },
  {
    id: 2,
    user: {
      name: 'Stephen Young',
      profileImageSrc: Profile2Src,
    },
    message: 'Great job guys',
    stars: 63,
    time: '1h ago',
  },
  {
    id: 3,
    user: {
      name: 'Wilson Mayer',
      profileImageSrc: Profile3Src,
    },
    message:
      'Your song touches my heart like premium grass-fed beef steak. It’s sweet, tender, and delicious. ',
    stars: 58,
    time: '38m ago',
  },
]

const mockRankedPostComments = [
  {
    id: 4,
    user: {
      name: 'Johny Bravo',
      profileImageSrc: Profile4Src,
    },
    message:
      'You’re one of the best rock band of all time. Even my 10-year-old nephew loves you. ',
    stars: 58,
    time: '3m ago',
    status: '#1 Fan',
  },
  {
    id: 5,
    user: {
      name: 'Jeff Philly',
      profileImageSrc: Profile5Src,
    },
    message:
      'OMG I’m so glad I finally got to meet you today. I’ve been a fan since high school. Your songs move me to tear every single time. I’m in love!',
    stars: 58,
    time: '3m ago',
    status: '#2 Fan',
  },
]

export default class PostCommentsScreen extends React.Component {
  static navigationOptions = { title: 'Comments' }

  constructor(props) {
    super(props)
    this.state = {
      boost: false,
      attentionTokens: 0,
    }
  }

  render() {
    return (
      <ScreenContainer>
        <KeyboardAvoidingContainer>
          <CommentContainer>
            <Comments>
              {mockPostComments.map(comment => (
                <FeedPostComment key={comment.id} {...comment} />
              ))}
            </Comments>
            <Spacer />
            <RankedComments>
              {mockRankedPostComments.map(comment => (
                <FeedPostComment key={comment.id} {...comment} />
              ))}
            </RankedComments>
          </CommentContainer>
          <NewCommentContainer>
            <BoostContainer>
              <Switch
                checked={this.state.boost}
                onChange={val =>
                  this.setState({
                    boost: val,
                    attentionTokens: Math.max(this.state.attentionTokens, 59),
                  })
                }
                platform="ios"
                color={Color.primary}
              />
              <BoostText>Boost to #1</BoostText>
              <BoostAmount>
                <Ionicons
                  name="md-star"
                  size={18}
                  color={Color.primary}
                  style={{ marginRight: 10 }}
                />
                <Stepper
                  style={{
                    flex: 0,
                    width: 100,
                    minWidth: 80,
                    justifyContent: 'center',
                  }}
                  min={0}
                  step={1}
                  value={this.state.attentionTokens}
                  onChange={val => this.setState({ attentionTokens: val })}
                  showNumber
                />
              </BoostAmount>
            </BoostContainer>
            <InputContainer>
              <TextareaContainer>
                <TextareaItem
                  title="Your comments"
                  placeholder="Your comments"
                  style={{ borderRadius: 5, padding: 5 }}
                  autoHeight
                />
              </TextareaContainer>
              <PostButton>
                <PostButtonText>Post</PostButtonText>
              </PostButton>
            </InputContainer>
          </NewCommentContainer>
        </KeyboardAvoidingContainer>
      </ScreenContainer>
    )
  }
}
