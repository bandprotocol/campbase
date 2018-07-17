import { Button, Checkbox, Icon, Input } from 'antd'
import * as React from 'react'
import Styled from 'styled-components'

const RememberMeSection = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

interface RegisterTabPaneListProps {
  registerSubmit?
}

class RegisterTabPane extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      secretCode: '',
      email: '',
    }
  }

  onChangeUserName = e => {
    this.setState({ userName: e.target.value })
  }

  onChangeEmail = e => {
    this.setState({ email: e.target.value })
  }

  onChangePassword = e => {
    this.setState({ password: e.target.value })
  }

  onChangeSecretCode = e => {
    this.setState({ secretCode: e.target.value })
  }

  render() {
    const { userName, password, email, secretCode } = this.state
    return (
      <div>
        <Input
          placeholder="Username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={userName}
          onChange={e => this.onChangeUserName(e)}
        />
        <Input
          placeholder="Email"
          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={email}
          onChange={e => this.onChangeEmail(e)}
        />
        <Input
          type="password"
          placeholder="Password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={password}
          onChange={e => this.onChangePassword(e)}
        />
        <Input
          type="secretCode"
          placeholder="Secret Code"
          prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={secretCode}
          onChange={e => this.onChangeSecretCode(e)}
        />
        <Button
          onClick={() =>
            this.props.registerSubmit({ userName, password, email, secretCode })
          }
          type="primary"
          style={{ width: '100%' }}
        >
          Register
        </Button>
      </div>
    )
  }
}

export default RegisterTabPane
