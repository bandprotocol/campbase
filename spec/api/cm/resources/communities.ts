import { DBCommunities } from 'spec/db'

export namespace Communities {
  export const path = '/api/cm/v1/communities'

  export namespace POST {
    export interface params {
      // Persistent
      name: string
      symbol: string
      profile_image: string
      business_name: string
      business_address: string
      business_country: string
      business_zipcode: string
      business_phone_number: string

      // Ephemeral for creating blockchain contract
      token_growth_rate: number
      token_scale: number
      token_commission: number
    }
    export type response = {
      id: number
      wallet_address: string
      contract_address: string
    }
  }

  export namespace GET {
    export interface params {}
    export type response = {
      communities: Array<Partial<DBCommunities>>
    }
  }
}
