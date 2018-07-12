import { BigNumber } from 'bignumber.js'

const BAND_PRECISION = 36
const BandBigNumber = BigNumber.clone({
  DECIMAL_PLACES: BAND_PRECISION,
  EXPONENTIAL_AT: BAND_PRECISION * 2,
})

type NumberType = string | BigNumber

export default class BandBalance {
  static BAND_PRECISION = BAND_PRECISION

  public balance: BigNumber

  static fromBunString(balance: string) {
    const balancePadded =
      [...Array(BAND_PRECISION + 1).fill('0')].join('') + balance

    const balanceWithDot =
      balancePadded.slice(0, -BAND_PRECISION) +
      '.' +
      balancePadded.slice(-BAND_PRECISION)

    return new BandBalance(new BandBigNumber(balanceWithDot))
  }

  constructor(balance: NumberType) {
    this.balance =
      typeof balance === 'string' ? new BandBigNumber(balance) : balance
  }

  plus(val: NumberType) {
    return new BandBalance(this.balance.plus(val))
  }

  minus(val: NumberType) {
    return new BandBalance(this.balance.minus(val))
  }

  toBandString() {
    return this.balance.toPrecision()
  }

  toBunString() {
    return this.balance
      .times(new BandBigNumber(10).pow(BAND_PRECISION))
      .toString()
  }
}
