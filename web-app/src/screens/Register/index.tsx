import { Button, Steps, Divider } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StateType } from '~/store'
import { changeStep } from '~/store/app/Register/action'
import BusinessInfoStep from '~/screens/Register/BusinessInfoStep'
import CommunityStep from '~/screens/Register/CommunityStep'
import TokenContractStep from '~/screens/Register/TokenContractStep'
import Review from '~/screens/Register/ReviewStep'

const Step = Steps.Step

interface PropTypes {
  currentStep: number
  changeStep: any
  prevStep: any
}

class Register extends React.Component<PropTypes, {}> {
  constructor(props) {
    super(props)
    this.state = {}
  }
  prevStep = () => {
    this.props.changeStep(this.props.currentStep - 1)
  }

  nextStep = () => {
    this.props.changeStep(this.props.currentStep + 1)
  }

  onFormItemChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const stepContents = [
      <BusinessInfoStep
        onFormItemChange={this.onFormItemChange}
        formValues={this.state}
      />,
      <CommunityStep />,
      <TokenContractStep />,
      <Review />,
    ]

    return (
      <div>
        <h1>Setup Community Account</h1>
        <h2>Connecting your fanbase through Blockchain technology</h2>
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
          <Steps current={this.props.currentStep}>
            <Step title="Business Info" />
            <Step title="Community" />
            <Step title="Token Issuance" />
            <Step title="Review" />
          </Steps>
          <div className="steps-content" style={{ marginTop: '20px' }}>
            {stepContents[this.props.currentStep]}
            <Button onClick={this.prevStep} style={{ marginRight: '5px' }}>
              Back
            </Button>
            <Button type="primary" onClick={this.nextStep}>
              Next
            </Button>
          </div>
          <Divider />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold' }}>Notice</div>
            <div>
              To comply with regulations in different demographics, we manually
              review every business that registers on our platform. The process
              may take up to 7 days for your business to get approved.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ app: { Register } }: StateType) => ({
  currentStep: Register.currentStep,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ changeStep }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
