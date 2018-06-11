import React from 'react'
import PropTypes from 'prop-types'
import Style from 'styled-components'
import { Button } from '~/antd'
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

const commentPropTypes = {
  id: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string,
}

export default class FeedPostComment extends React.Component {
  static propTypes = {
    ...commentPropTypes,
    replies: PropTypes.arrayOf(PropTypes.shape(commentPropTypes)),
  }

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
