import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from '../../../node_modules/redux'
import { Layout } from 'antd'

const { Header, Footer, Sider, Content } = Layout

interface PropTypes {
  currentTab: string
}

class Dashboard extends React.Component<PropTypes, {}> {
  render() {
    return (
      <div>
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Dashboard Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = ({ Dashboard }) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
