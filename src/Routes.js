import React from 'react'
import { NativeRouter } from 'react-router-native'

import Login from '~/routes/Login'

export default class AppRoutes extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Login />
      </NativeRouter>
    )
  }
}
