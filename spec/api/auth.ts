export namespace AuthRequestPin {
  export const path = '/auth/v1/request_pin'

  export namespace POST {
    export interface params {
      country_code: string
      phone_number: string
    }
    export type response = undefined
  }
}

export namespace AuthRegister {
  export const path = '/auth/v1/register'

  export namespace POST {
    export interface params {
      country_code: string
      phone_number: string
      phone_pin: string
      email: string
      password: string
      display_name: string
    }
    export type response = undefined
  }
}

export namespace AuthLoginPhone {
  export const path = '/auth/v1/login/phone'

  export namespace POST {
    export interface params {
      country_code: string
      phone_number: string
      phone_pin: string
    }
    export interface response {
      jwt: string
    }
  }
}

export namespace AuthLoginEmail {
  export const path = '/auth/v1/login/email'

  export namespace POST {
    export interface params {
      email: string
      password: string
    }
    export interface response {
      jwt: string
    }
  }
}
