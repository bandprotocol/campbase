import { API, APIParamsType } from '~/store/helpers/api'
import { APIMethod } from 'spec/api/base'
import {
  AuthRequestPin,
  AuthRegister,
  AuthLoginPhone,
  AuthLoginEmail,
} from 'spec/api/auth'

// type A = <T>(action: Promise<(dispatch, getState) => T>) => T

// async function y(dispatch) {
//   const x = await dispatch(AuthLoginEmailAPI.POST(
//     () => ({
//       email: '1',
//       password: '12'
//     })
//   ))
// }

export const AuthRequestPinAPI = new class extends API {
  path = AuthRequestPin.path

  async POST(params: APIParamsType<AuthRequestPin.POST.params>) {
    return this.action<AuthRequestPin.POST.response>(APIMethod.POST, params)
  }
}()

export const AuthRegisterAPI = new class extends API {
  path = AuthRegister.path

  async POST(params: APIParamsType<AuthRegister.POST.params>) {
    return this.action<AuthRegister.POST.response>(APIMethod.POST, params)
  }
}()

export const AuthLoginPhoneAPI = new class extends API {
  path = AuthLoginPhone.path

  async POST(params: APIParamsType<AuthLoginPhone.POST.params>) {
    return this.action<AuthLoginPhone.POST.response>(APIMethod.POST, params)
  }
}()

export const AuthLoginEmailAPI = new class extends API {
  path = AuthLoginEmail.path

  async POST(params: APIParamsType<AuthLoginEmail.POST.params>) {
    return this.action<AuthLoginEmail.POST.response>(APIMethod.POST, params)
  }
}()
