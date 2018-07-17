import { Alert, Tabs } from 'antd'
import { push } from 'connected-react-router'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'store/PreSignIn/action'
import Styled from 'styled-components'
import SignInTabPane from './SignInTabPane'

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
  login: any,
  error: string,
}

class PreSignIn extends React.Component<PropTypes> {
  constructor(props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)

  }

  loginSubmit({userName, password, rememberMe}) {
    this.props.login(userName, password, rememberMe)
  }

  render() {
    return (
      <div>
        <h1>Band Network</h1>
        <h2>Connecting your fanbase through Blockchain technology</h2>
        <SignInTab>
          {this.props.error ? <Alert message={this.props.error} type="error" /> : ''}
          <Tabs defaultActiveKey="1">
            <TabPane tab="Sign In" key="1">
              <TabPaneDiv>
                <SignInTabPane
                  loginSubmit={this.loginSubmit}
                />
              </TabPaneDiv>
            </TabPane>
            <TabPane tab="Register" key="2">
              Register
            </TabPane>
          </Tabs>
        </SignInTab>
      </div>
    )
  }
}

const mapStateToProps = ({ PreSignIn }) => ({
  error: PreSignIn.error
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreSignIn)
