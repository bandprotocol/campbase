export enum APIResponseStatus {
  OK = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export interface APIResponse<D = {}> {
  status: APIResponseStatus
  success: boolean
  error?: string
  data?: D
}
