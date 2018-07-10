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
