import { Button, Steps } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StateType } from '~/store'
import { changeStep } from '~/store/app/Register/action'

const Step = Steps.Step

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
          <div className="steps-content">
            Content
            <Button type="primary" onClick={this.nextStep}>
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ app: { Register } }: StateType) => ({})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ changeStep }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
