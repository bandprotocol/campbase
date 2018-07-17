import { push } from 'connected-react-router'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Home = () => (
    <div>
        <h1>About Us</h1>
        <p>Hello Medium!</p>
    </div>
)

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Home)