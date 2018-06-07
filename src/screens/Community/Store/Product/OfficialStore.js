import React from 'react'
import Style from 'styled-components'

import TitledList from '~/components/TitledList'

const Container = Style.View``

const mockListData = [
  {
    title: 'Pricing',
    detail: 'Dynamic',
  },
  {
    title: 'Sellback',
    detail: 'Allow',
  },
  {
    title: 'Qty.',
    detail: '630',
  },
]

export default class OfficialStoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Official Store',
  }

  render() {
    return (
      <Container>
        <TitledList list={mockListData} onItemClick={() => false} />
      </Container>
    )
  }
}