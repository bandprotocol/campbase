export namespace UserMe {
  export const path = '/api/cm/v1/user/me'

  export namespace GET {
    export type params = {}
    export type response = {
      id: number
      username: string
      email: string
    }
  }
}
