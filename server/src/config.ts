export const AUTH_ROOT = '/auth/v1'
export const API_ROOT = '/api/v1' // NOTE: API always requires JWT
export const PORT = process.env.PORT || 5000
export const JWT_SECRET = process.env.JWT_SECRET || 'notsosecret'

export const PASSWORD_SALT_ROUNDS = 10
