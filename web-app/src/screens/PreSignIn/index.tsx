import { Alert, Button, Tabs } from 'antd'
import { push } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { login, register, changeTab } from '~/store/app/PreSignIn/action'
import Styled from 'styled-components'
import RegisterTabPane from '~/screens/PreSignIn/RegisterTabPane'
import SignInTabPane from '~/screens/PreSignIn/SignInTabPane'
import { StateType } from '~/store'
import FormListInput from '~/components/FormListInput'

const TabPane = Tabs.TabPane

const SignInTab = Styled.div`
  margin: auto;
  width: 500px;
`

interface PropTypes {
  login: any
  register: any
  changeTab: any
  error: string
  alertMessage: any
  currentTabKey: string
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

  changeTab = e => {
    this.props.changeTab(e)
  }

  render() {
    return (
      <div>
        <h1>Band Network</h1>
        <h2>Connecting your fanbase through Blockchain technology</h2>
        <SignInTab>
          {this.props.alertMessage.message ? (
            <Alert {...this.props.alertMessage} />
          ) : (
            ''
          )}
          <Tabs
            activeKey={this.props.currentTabKey}
            onTabClick={this.changeTab}
          >
            <TabPane tab="Sign In" key="0">
              <FormListInput>
                <SignInTabPane loginSubmit={this.loginSubmit} />
              </FormListInput>
            </TabPane>
            <TabPane tab="Register" key="1">
              <FormListInput>
                <RegisterTabPane registerSubmit={this.registerSubmit} />
              </FormListInput>
            </TabPane>
          </Tabs>
        </SignInTab>
      </div>
    )
  }
}

const mapStateToProps = ({ app: { PreSignIn } }: StateType) => ({
  alertMessage: PreSignIn.alertMessage,
  currentTabKey: PreSignIn.currentTabKey,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login,
      register,
      changeTab,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreSignIn)
