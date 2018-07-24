import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import { PropTypes } from 'declare'
import { autobind } from '~/utils'

type Props = PropTypes.withNavigation

export default class ScanAddressContainer extends React.Component<Props> {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  @autobind
  onQRCodeRead({ type, data }) {
    const callback = this.props.navigation.getParam('callback', () => false)
    callback(data)
    this.props.navigation.pop()
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this.onQRCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      )
    }
  }
}
