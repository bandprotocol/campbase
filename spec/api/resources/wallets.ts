export namespace Wallets {
  export const path = '/api/v1/wallets'

  export namespace POST {
    export interface params {
      verify_key: string
      encrypted_secret_key: string
    }
    export interface response {}
  }
}
