import { Alert, Button, Tabs } from 'antd'
import { push } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { connect, MapStateToPropsParam } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, register } from '~/store/PreSignIn/action'
import Styled from 'styled-components'
import RegisterTabPane from './RegisterTabPane'
import SignInTabPane from './SignInTabPane'
import { StateType } from '~/store'

const TabPane = Tabs.TabPane

const SignInTab = Styled.div`
  margin: auto;
  width: 500px;
`

const TabPaneDiv = Styled.div`
  display: flex;
  flex-direction: column;
  > div > *:not(:first-child) {
    margin-top: 20px;
  }
`

interface PropTypes {
  login: any
  register: any
  error: string
  registerError: string
  registerSuccess: string
  history: History
}

class PreSignIn extends React.Component<PropTypes> {
  constructor(props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit({ userName, password, rememberMe }) {
    this.props.login(userName, password, rememberMe)
  }

  registerSubmit = ({ userName, password, email, secretCode }) => {
    this.props.register(userName, password, email, secretCode)
  }

  navigateToRegister = () => {
    this.props.history.push('/register') // TODO fix to use redux store
  }

  render() {
    return (
      <div>
        <h1>Band Network</h1>
        <h2>Connecting your fanbase through Blockchain technology</h2>
        <SignInTab>
          {this.props.error || this.props.registerError ? (
            <Alert
              message={this.props.error || this.props.registerError}
              type="error"
            />
          ) : (
            ''
          )}
          {this.props.registerSuccess ? (
            <Alert message={this.props.registerSuccess} type="success" />
          ) : (
            ''
          )}
          <Tabs defaultActiveKey="0">
            <TabPane tab="Sign In" key="0">
              <TabPaneDiv>
                <SignInTabPane loginSubmit={this.loginSubmit} />
              </TabPaneDiv>
            </TabPane>
            <TabPane tab="Register" key="1">
              <TabPaneDiv>
                <RegisterTabPane registerSubmit={this.registerSubmit} />
              </TabPaneDiv>
            </TabPane>
          </Tabs>
        </SignInTab>
      </div>
    )
  }
}

const mapStateToProps = ({ PreSignIn }: StateType) => ({
  error: PreSignIn.error,
  registerError: PreSignIn.registerError,
  registerSuccess: PreSignIn.registerSuccess,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      register,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreSignIn)
