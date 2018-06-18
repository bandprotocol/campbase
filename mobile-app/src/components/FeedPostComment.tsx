import * as React from 'react'
import Style from '~/styled-components'
import { Button } from 'antd-mobile-rn'
import { Color } from '~/utils'

import { Ionicons } from '@expo/vector-icons'
import ProfileImage from '~/components/ProfileImage'

const InfoContainer = Style.View`
  flex-direction: row;
  padding-top: 5;
  padding-horizontal: 5;
  margin-bottom: 5;
`
const LeftInfoContainer = Style.View`
  width: 90;
  align-items: center;
`
const RightInfoContainer = Style.View`
  flex: 1;
`

const StatusText = Style.Text`
  color: ${Color.primary};
  font-weight: bold;
`

const Line = Style.Text`
  margin-bottom: 3;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 20;
`
const BoldText = Style.Text`
  font-weight: bold;
`
const Text = Style.Text`
`
const StarText = Style.Text`
  flex-direction: row;
  color: ${Color.grey};
`

interface Comment {
  id
  user
  message
  stars
  time
  status
}

interface FeedPostCommentProps extends Comment {
  replies: Array<Comment>
}

export default class FeedPostComment extends React.Component<
  FeedPostCommentProps
> {
  render() {
    const { id, user, message, stars, time, status } = this.props

    return (
      <InfoContainer>
        <LeftInfoContainer>
          <ProfileImage src={user.profileImageSrc} />
        </LeftInfoContainer>
        <RightInfoContainer>
          <Line key={id}>
            {status && <StatusText>{status} </StatusText>}
            <BoldText>{user.name}</BoldText> <Text>{message}</Text>{' '}
          </Line>
          <Line>
            <StarText>
              <Ionicons name="md-star" size={18} color="#777777" /> {stars}
              {' - '}
              {time}
            </StarText>
          </Line>
        </RightInfoContainer>
      </InfoContainer>
    )
  }
}
