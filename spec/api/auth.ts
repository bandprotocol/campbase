import { APIResponse } from './base'

/**
 * POST /auth/v1/request_pin
 */
export interface RequestPinRequestParams {
  country_code: string
  phone_number: string
}
export interface RequestPinResponseData {}

/**
 * POST /auth/v1/register
 */
export interface RegisterRequestParams {
  country_code: string
  phone_number: string
  phone_pin: string
  email: string
  password: string
  display_name: string
}
export interface RegisterResponseData {}

/**
 * POST /auth/v1/login/phone
 */
export interface LoginPhoneRequestParams {
  country_code: string
  phone_number: string
  phone_pin: string
}
export interface LoginPhoneResponseData {
  jwt: string
}

/**
 * POST /auth/v1/login/email
 */
export interface LoginEmailRequestParams {
  email: string
  password: string
}
export interface LoginEmailResponseData {
  jwt: string
}
