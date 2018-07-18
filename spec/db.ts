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

export interface DBCommunityManagers {
  id: number
  username: string
  password_hash: string
  email: string
  email_activated: number
}

export interface DBCommunities {
  id: number
  name: string
  symbol: string
  profile_image: string
  business_name: string
  business_address: string
  business_country: string
  business_zipcode: string
  business_phone_number: string

  community_manager_id: number
  wallet_address: string
  contract_address: string
}

export interface DBCommunityWallets {
  id: number
  sk: string
  vk: string
  address: string
}
