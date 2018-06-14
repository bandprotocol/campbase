import axios from 'axios'
import * as querystring from 'querystring'
import { TWILLIO_API_KEY } from '~/config'

export default class SMS {
  static async sendVericationCode(country_code: string, phone_number: string) {
    return axios.post(
      'https://api.authy.com/protected/json/phones/verification/start',
      querystring.stringify({
        api_key: TWILLIO_API_KEY,
        via: 'sms',
        phone_number,
        country_code,
      })
    )
  }

  static async checkVericationCode(
    country_code: string,
    phone_number: string,
    verification_code: string
  ) {
    return axios.post(
      'https://api.authy.com/protected/json/phones/verification/start',
      querystring.stringify({
        api_key: TWILLIO_API_KEY,
        verification_code,
        phone_number,
        country_code,
      })
    )
  }
}
