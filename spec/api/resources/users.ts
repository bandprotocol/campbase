export namespace Users {
  export const path = '/api/v1/users'

  export namespace GET {
    export interface params {}
    export interface response {}
  }
}

export namespace UsersId {
  export const path = '/api/v1/users/:id' // /:id includes /me

  export namespace GET {
    export interface params {
      id: number | string
    }
    export interface response {}
  }
}
