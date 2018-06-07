import React from 'react'
import { View } from 'react-native'
import EventList from '~/components/EventList'
import { Ionicons } from '@expo/vector-icons'

const MonthList = [
  {
    monthName: 'May 2018',
    events: [
      {
        date: 1,
        name: 'Concert 15 Year Bodyslam',
        details: '5:45 PM @Bangkok, Thailand',
      },
      {
        date: 7,
        name: 'Phuket Meet & Greet',
        details: '12:45 PM @Phuket, Thailand',
      },
      {
        date: 18,
        name: 'Bodyslam 20 years: Live in Bangkok',
        details: '10:20 AM @Bangkok, Thailand',
      },
    ],
  },
  {
    monthName: 'June 2018',
    events: [
      {
        date: 4,
        name: 'Concert 15 Year Bodyslam',
        details: '5:45 PM @Bangkok, Thailand',
      },
      {
        date: 13,
        name: 'Phuket Meet & Greet',
        details: '12:45 PM @Phuket, Thailand',
      },
      {
        date: 28,
        name: 'Bodyslam 20 years: Live in Bangkok',
        details: '10:20 AM @Bangkok, Thailand',
      },
    ],
  },
]

export default class CommunityEventsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Events',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
        color={tintColor}
        size={28}
      />
    ),
  }

  render() {
    const { navigation } = this.props

    return (
      <View>
        {MonthList.map(month => (
          <EventList
            key={month.monthName}
            title={month.monthName}
            list={month.events}
            onItemClick={() => navigation.navigate('EventDetail')} //id => navigation.replace('CommunityTab')
          />
        ))}
      </View>
    )
  }
}
