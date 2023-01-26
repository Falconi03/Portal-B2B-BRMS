import { AnyAction } from 'redux'

import { APIAction, callApi } from '@/redux/api'

type APIParameters = {
  actionName: string
  url: string
  headers?: Record<string, string>
  data?: Record<string, unknown>
  customOnSuccess?: (result: Record<string, unknown>) => AnyAction
  customOnFailure?: (result: Record<string, unknown>) => AnyAction
}

let jwtTokens: JWTTokens | undefined
export const setJWTTokens = (tokens: JWTTokens | undefined): void => {
  jwtTokens = tokens
}

export const Api = {
  get: (parameters: APIParameters): APIAction =>
    callApi({ ...parameters, jwtTokens, method: 'GET' }),
  post: (parameters: APIParameters): APIAction =>
    callApi({ ...parameters, jwtTokens, method: 'POST' }),
}
