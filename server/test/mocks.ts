import * as SMS from '~/external/sms'
import { AxiosResponse } from 'axios'
import { mockModule } from 'test/utils'

export const mockSMSSuccess = mockModule(SMS, {
  sendVerificationCode: async () => ({ status: 200 } as AxiosResponse),
  checkVerificationCode: async () => ({ status: 200 } as AxiosResponse),
})

export const mockSMSFail = mockModule(SMS, {
  sendVerificationCode: async () => {
    throw Error('SMS unvailable')
  },
  checkVerificationCode: async () => {
    throw Error('SMS unvailable')
  },
})
