import React from 'react'
import Style from 'styled-components'

const ScreenContainer = Style.ScrollView.attrs({
  contentContainerStyle: p =>
    p.darkBackground
      ? { backgroundColor: '#f4f1fc', paddingTop: 80 }
      : { backgroundColor: '#ffffff', paddingTop: 80 },
})`
  flex: 1;
  background: ${p => (p.darkBackground ? '#fafafa' : '#ffffff')};
`

export default ScreenContainer
