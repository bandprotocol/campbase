export namespace AuthSignUp {
  export const path = '/auth/cm/v1/signup'

  export namespace POST {
    export interface params {
      username: string
      password_hash: string
      password_salt: string
      email: string
      secret_code: string // For registration
    }
    export type response = {
      jwt: string
    }
  }
}

export namespace AuthLogin {
  export const path = '/auth/cm/v1/login'

  export namespace POST {
    export interface params {
      username: string
      password: string
    }
    export type response = {
      jwt: string
    }
  }
}
