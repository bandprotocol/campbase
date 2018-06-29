import axios, { AxiosResponse } from 'axios'
import * as querystring from 'querystring'
import { TWILLIO_API_KEY, TWILLIO_VERIFICATION_CODE_LENGTH } from '~/config'

export const sendVerificationCode = async (
  country_code: string,
  phone_number: string
): Promise<AxiosResponse> => {
  return axios.post(
    'https://api.authy.com/protected/json/phones/verification/start',
    querystring.stringify({
      api_key: TWILLIO_API_KEY,
      via: 'sms',
      phone_number,
      country_code,
      code_length: TWILLIO_VERIFICATION_CODE_LENGTH,
    })
  )
}

export const checkVerificationCode = async (
  country_code: string,
  phone_number: string,
  verification_code: string
): Promise<AxiosResponse> =>
  axios.post(
    'https://api.authy.com/protected/json/phones/verification/start',
    querystring.stringify({
      api_key: TWILLIO_API_KEY,
      verification_code,
      phone_number,
      country_code,
    })
  )
