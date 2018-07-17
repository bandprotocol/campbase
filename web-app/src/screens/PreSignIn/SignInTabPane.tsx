import * as React from 'react'
import { Button, Input, Icon, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const RememberMeSection = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

interface SignInTabPaneListProps {
    loginSubmit?
  }

class SignInTabPane extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      rememberMe: false,
    }
  }

  onChangeUserName = e => {
    this.setState({ userName: e.target.value })
  }

  onChangePassword = e => {
    this.setState({ password: e.target.value })
  }

  onChangeRememberMe = e => {
    this.setState({ rememberMe: e.target.checked })
  }

  render() {
    const { userName, password, rememberMe } = this.state
    return (
      <div>
        <Input
          placeholder="Email or Phone Number"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={userName}
          onChange={e => this.onChangeUserName(e)}
        />
        <Input
          type="password"
          placeholder="Password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={password}
          onChange={e => this.onChangePassword(e)}
        />
        <RememberMeSection>
          <div>
            <Checkbox
              checked={rememberMe}
              onChange={e => this.onChangeRememberMe(e)}
            >
              Remember Me
            </Checkbox>
          </div>
          <div><a>Forget password</a></div>
        </RememberMeSection>
        <Button onClick={() => this.props.loginSubmit({userName, password, rememberMe})} type="primary" style={{width: '100%'}}>Submit</Button>
        <div>Connect with us:</div>
      </div>
    )
  }
}

export default SignInTabPane
