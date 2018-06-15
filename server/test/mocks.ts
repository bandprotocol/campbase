import * as SMS from '~/external/sms'
import { AxiosResponse } from 'axios'
import { mockModule } from 'test/utils'

export const mockSendSMSSuccess = mockModule(SMS, {
  sendVerificationCode: async () => ({ status: 200 } as AxiosResponse),
})

export const mockSendSMSFail = mockModule(SMS, {
  sendVerificationCode: async () => {
    throw Error('SMS unvailable')
  },
})

export const mockCheckSMSSuccess = mockModule(SMS, {
  checkVerificationCode: async () => ({ status: 200 } as AxiosResponse),
})

export const mockCheckSMSFail = mockModule(SMS, {
  checkVerificationCode: async () => {
    throw Error('SMS unvailable')
  },
})
