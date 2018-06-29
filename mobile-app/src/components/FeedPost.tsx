import * as React from 'react'
import { Alert } from 'react-native'
import Styled from '~/styled-components'
import { Button } from 'antd-mobile-rn'
import ElevatedView from 'react-native-elevated-view'
import { Color } from '~/utils'
import { Ionicons } from '@expo/vector-icons'

import ProfileImage from '~/components/ProfileImage'

const Container = Styled.View`
  padding: 7px 15px;
`

const MediaContainer = Styled.View`

`
const MediaImage = Styled.Image`
  height: 220;
  width: 100%;
  border-top-right-radius: 8;
  border-top-left-radius: 8;
`
const MediaDetails = Styled.View`

`

const InfoContainer = Styled.View`
  flex-direction: row;
  padding-top: 15;
  padding-right: 15;
  padding-bottom: 10;
`
const LeftInfoContainer = Styled.View`
  padding-top: 5;
  width: 90;
  align-items: center;
`
const RightInfoLinkContainer = Styled.TouchableWithoutFeedback`
  flex: 1;
`
const RightInfoContainer = Styled.View`
  flex: 1;
`

const PostStarText = Styled.Text`
  margin-top: 10;
  margin-bottom: 5;
  color: ${Color.secondary};
  flex-direction: row;
`

const Line = Styled.Text`
  margin-bottom: 5;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 20;
`
const BoldText = Styled.Text`
  font-weight: bold;
`
const BolderText = Styled.Text`
  font-weight: 900;
  color: ${Color.primary};
`
const Text = Styled.Text`
`
const StarText = Styled.Text`
  color: ${Color.grey};
  flex-direction: row;
`

interface FeedPostProps {
  mediaSrc: any
  message: string
  user: object
  stars: number
  comments: Array<object>
  navigation: any
}

export default class FeedPost extends React.Component<FeedPostProps> {
  render() {
    const { mediaSrc, message, user, stars, comments, navigation } = this.props

    return (
      <Container>
        <ElevatedView
          elevation={2}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            paddingBottom: 10,
            backgroundColor: '#ffffff',
          }}
        >
          <MediaContainer>
            <MediaImage source={mediaSrc} />
          </MediaContainer>
          <InfoContainer>
            <LeftInfoContainer>
              <ProfileImage src={user.profileImageSrc} />
              <PostStarText>
                <Ionicons name="md-star" size={18} color={Color.secondary} />{' '}
                {stars}
              </PostStarText>
              <Button
                type="primary"
                size="small"
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: Color.secondary,
                  borderWidth: 0,
                }}
                onClick={() =>
                  Alert.alert(
                    'Insufficient Attention Token',
                    'You need at least 20 tokens to boost this post.',
                    [
                      {
                        text: 'Get Attention Tokens',
                        onPress: () => navigation.navigate('AttentionTokens'),
                      },
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  )
                }
              >
                Boost
              </Button>
            </LeftInfoContainer>
            <RightInfoLinkContainer
              onPress={() => navigation.navigate('PostComments')}
            >
              <RightInfoContainer>
                <Line>
                  <BolderText>{user.name}</BolderText> <Text>{message}</Text>
                </Line>
                {comments.map(comment => (
                  <Line key={comment.id}>
                    <BoldText>{comment.user.name}</BoldText>{' '}
                    <Text>{comment.message}</Text>{' '}
                    <StarText>
                      <Ionicons
                        name="md-star"
                        size={18}
                        color={Color.darkGrey}
                      />{' '}
                      {comment.stars}
                    </StarText>
                  </Line>
                ))}
              </RightInfoContainer>
            </RightInfoLinkContainer>
          </InfoContainer>
        </ElevatedView>
      </Container>
    )
  }
}
