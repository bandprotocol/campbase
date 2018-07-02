export namespace UserSignUp {
  export const path = '/api/v1/user/signup'

  export namespace POST {
    export type params = {
      display_name: string
      email: string
    }
    export type response = {
      jwt: string
    }
  }
}
export namespace UserMe {
  export const path = '/api/v1/user/me'

  export namespace GET {
    export type params = undefined
    export type response = {
      id: number
      country_code: string
      phone_number: string
      email: string
      email_activated: boolean
      display_name: string
      profile_image: string
    }
  }
}