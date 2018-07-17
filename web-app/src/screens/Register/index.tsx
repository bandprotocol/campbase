import { Button, Steps, Tabs } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Step = Steps.Step
const TabPane = Tabs.TabPane

interface PropTypes {
  currentStep: number
}

class Register extends React.Component<PropTypes, {}> {
  nextStep = () => {
    console.log('next step')
  }

  render() {
    return (
      <div>
        <h1>Setup Community Account</h1>
        <h2>Connecting your fanbase through Blockchain technology</h2>
        <div style={{ width: '800px', margin: 'auto', padding: '20px' }}>
          <Steps current={0}>
            <Step title="Business Info" />
            <Step title="Community" />
            <Step title="Token Issuance" />
            <Step title="Review" />
          </Steps>
        </div>
        <Tabs defaultActiveKey="0" tabBarStyle={{ display: 'none' }}>
          <TabPane tab="Step1" key="0">
            Step 1
            <Button type="primary" onClick={this.nextStep}>
              Next
            </Button>
          </TabPane>
          <TabPane tab="Step2" key="1">
            Step 2
            <Button type="primary">Next</Button>
          </TabPane>
          <TabPane tab="Step3" key="2">
            Step 3
            <Button type="primary">Next</Button>
          </TabPane>
          <TabPane tab="Step4" key="3">
            Step 4
            <Button type="primary">Submit</Button>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = ({ Register }) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
