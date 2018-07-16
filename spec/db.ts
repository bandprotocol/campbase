export interface DBUsers {
  id: number
  country_code: string
  phone_number: string
  email: string
  email_activated: number
  display_name: string
  profile_image: string
}

export interface DBWallets {
  user_id: string
  verify_key: string
  encrypted_secret_key: string
}

export interface DBCommunityManager {
  username: string
  password_hash: string
  password_salt: string
  email: string
}

export interface DBCommunity {
  name: string
  symbol: string
  profile_image: string
  contract_address: string
  business_name: string
  business_address: string
  business_country: string
  business_zipcode: string
  business_phone_number: string
}
