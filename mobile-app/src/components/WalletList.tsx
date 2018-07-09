import * as React from 'react'
import Styled from '~/styled-components'
import { List } from 'antd-mobile-rn'

interface WalletListProps {
  list: Array<{
    address: string
    balance: number
  }>
  onItemClick?
}

export default class WalletList extends React.Component<WalletListProps> {
  render() {
    const { list, onItemClick } = this.props

    return (
      <List>
        {list.map(wallet => (
          <List.Item
            key={wallet.address}
            arrow="horizontal"
            onClick={() => onItemClick(wallet.address)}
            multipleLine
          >
            {wallet.address}
            <List.Item.Brief>Balance: {wallet.balance} BAND</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
