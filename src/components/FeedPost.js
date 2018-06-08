import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import Style from 'styled-components'
import { Button } from '~/antd'
import ElevatedView from 'react-native-elevated-view'
import { Color } from '~/utils'
import { Ionicons } from '@expo/vector-icons'

import ProfileImage from '~/components/ProfileImage'

const Container = Style.View`
  padding: 7px 15px;
`

const MediaContainer = Style.View`

`
const MediaImage = Style.Image`
  height: 220;
  width: 100%;
  border-top-right-radius: 8;
  border-top-left-radius: 8;
`
const MediaDetails = Style.View`

`

const InfoContainer = Style.View`
  flex-direction: row;
  padding-top: 15;
  padding-right: 15;
  padding-bottom: 10;
`
const LeftInfoContainer = Style.View`
  padding-top: 5;
  width: 90;
  align-items: center;
`
const RightInfoLinkContainer = Style.TouchableWithoutFeedback`
  flex: 1;
`
const RightInfoContainer = Style.View`
  flex: 1;
`

const PostStarText = Style.Text`
  margin-top: 10;
  margin-bottom: 5;
  color: ${Color.secondary};
  flex-direction: row;
`

const Line = Style.Text`
  margin-bottom: 5;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 22;
`
const BoldText = Style.Text`
  font-weight: bold;
`
const BolderText = Style.Text`
  font-weight: 900;
  color: ${Color.primary};
`
const Text = Style.Text`
`
const StarText = Style.Text`
  color: ${Color.grey};
  flex-direction: row;
`

export default class FeedPost extends React.Component {
  static propTypes = {
    mediaSrc: PropTypes.any.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    navigation: PropTypes.any.isRequired,
  }

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
