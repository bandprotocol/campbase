/**
 * Blockchain is HERE!
 */

import BandProtocolClient from 'bandprotocol'

export function createWallet() {
  const wallet = BandProtocolClient.generateRandomKey()

  if (process.env.NODE_ENV !== 'test') {
    console.log('New wallet created', wallet)
  }

  return wallet
}

export async function createContract(
  sk: string,
  token_growth_rate: number,
  token_scale: number,
  token_commission: number
) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('New contract created')
    console.log(arguments)
  }

  return 'BX34 ABCD ABCD ABCD ABCD ABCD ABCD ABCD ABCD'
}
