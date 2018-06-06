import React from 'react'
import PropTypes from 'prop-types'
import Style from 'styled-components'
import { Button } from '~/antd'

import { Ionicons } from '@expo/vector-icons'
import ProfileImage from '~/components/ProfileImage'

const Container = Style.View`
  margin-bottom: 20;
`

const MediaContainer = Style.View`

`
const MediaImage = Style.Image`
  height: 240;
  width: 100%;
`
const MediaDetails = Style.View`

`

const InfoContainer = Style.View`
  flex-direction: row;
  padding-top: 20;
`
const LeftInfoContainer = Style.View`
  width: 100;
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
  color: #108ee9;
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
const Text = Style.Text`
`
const StarText = Style.Text`
  color: #66b6f9;
  flex-direction: row;
`

export default class FeedPost extends React.Component {
  static propTypes = {
    mediaSrc: PropTypes.any.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    onClick: PropTypes.func,
  }

  render() {
    const { mediaSrc, message, user, stars, comments, onClick } = this.props

    return (
      <Container>
        <MediaContainer>
          <MediaImage source={mediaSrc} />
        </MediaContainer>
        <InfoContainer>
          <LeftInfoContainer>
            <ProfileImage src={user.profileImageSrc} />
            <PostStarText>
              <Ionicons name="md-star" size={18} color="#108ee9" /> {stars}
            </PostStarText>
            <Button
              type="primary"
              size="small"
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              Boost
            </Button>
          </LeftInfoContainer>
          <RightInfoLinkContainer onPress={onClick}>
            <RightInfoContainer>
              <Line>
                <BoldText>{user.name}</BoldText> <Text>{message}</Text>
              </Line>
              {comments.map(comment => (
                <Line key={comment.id}>
                  <BoldText>{comment.user.name}</BoldText>{' '}
                  <Text>{comment.message}</Text>{' '}
                  <StarText>
                    <Ionicons name="md-star" size={18} color="#66b6f9" />{' '}
                    {comment.stars}
                  </StarText>
                </Line>
              ))}
            </RightInfoContainer>
          </RightInfoLinkContainer>
        </InfoContainer>
      </Container>
    )
  }
}
