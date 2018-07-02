export namespace AuthRequestPin {
  export const path = '/auth/v1/pin/request'

  export namespace POST {
    export interface params {
      country_code: string
      phone_number: string
    }
    export type response = {}
  }
}

export namespace AuthValidatePin {
  export const path = '/auth/v1/pin/validate'

  export namespace POST {
    export interface params {
      country_code: string
      phone_number: string
      phone_pin: string
    }
    export type response = {
      account_created: boolean
      jwt: string
    }
  }
}

export namespace AuthActivateEmail {
  export const path = '/auth/v1/email/activate'

  export namespace POST {
    export interface params {
      email: string
      secret: string
    }
    export type response = {}
  }
}
