import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from '../../../node_modules/redux'

interface PropTypes {
  currentTab: string
}

class Dashboard extends React.Component<PropTypes, {}> {}

const mapStateToProps = ({ Dashboard }) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
