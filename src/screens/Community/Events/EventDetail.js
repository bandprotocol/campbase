import React from 'react'
import Style from 'styled-components'

import TicketList from '~/components/TicketList'
import TitledList from '~/components/TitledList'

import EventImageSrc from '~/assets/feed-image-4.jpg'

const Container = Style.View``

const EventImage = Style.Image`
  height: 240;
  width: 100%;
`

const mockDetailList = [
  {
    title: 'Date',
    detail: 'May 28th, 2018',
  },
  {
    title: 'Time',
    detail: '10:20 AM - 2:50 PM (3:30 Hours)',
  },
  {
    title: 'Place',
    detail: 'Grand Hall - Central World Plaza, Bangkok, Thailand',
  },
]

const mockTicketList = [
  {
    id: 0,
    availability: 1,
    name: 'Concert 15 Year Bodyslam',
    details: '5:45 PM @Bangkok, Thailand',
  },
  {
    id: 1,
    availability: 7,
    name: 'Phuket Meet & Greet',
    details: '12:45 PM @Phuket, Thailand',
  },
  {
    id: 2,
    availability: 18,
    name: 'Bodyslam 20 years: Live in Bangkok',
    details: '10:20 AM @Bangkok, Thailand',
  },
]

export default class EventDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Concert 15 Year Bodyslam',
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <EventImage source={EventImageSrc} />
        <TitledList
          title="Event Info"
          list={mockDetailList}
          onItemClick={() => {}}
        />
        <TicketList
          title="Purchase Ticket"
          list={mockTicketList}
          onItemClick={() => {}}
        />
      </Container>
    )
  }
}
