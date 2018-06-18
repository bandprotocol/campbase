import React from 'react'
import Style from 'styled-components'
import { Button } from '~/antd'
import { Color } from '~/utils'

const Container = Style.SafeAreaView`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
`

export default ({ onSignIn }) => (
  <Container>
    <Button onClick={onSignIn}>Sign In!</Button>
  </Container>
)
