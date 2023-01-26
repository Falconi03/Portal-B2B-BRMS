import produce from 'immer'
import { AnyAction } from 'redux'

export type APIAction = {
  type: string
  payload: APIActionParameter
}

export type APIActionParameter = {
  actionName: string
  url: string
  method: string
  headers?: Record<string, string>
  data?: Record<string, unknown>
  jwtTokens?: JWTTokens
  customOnSuccess?: (result: Record<string, unknown>) => AnyAction
  customOnFailure?: (result: Record<string, unknown>) => AnyAction
}

export const ACTIONS = {
  API: 'API/API',
  API_START: 'API/API_START',
  API_END: 'API/API_END',
  ACCESS_DENIED: 'API/ACCESS_DENIED',
  API_ERROR: 'API/API_ERROR',
}

export const apiStart = (actionName: string): AnyAction => ({
  type: ACTIONS.API_START,
  payload: actionName,
})

export const apiEnd = (actionName: string): AnyAction => ({
  type: ACTIONS.API_END,
  payload: actionName,
})

export const accessDenied = (url: string): AnyAction => ({
  type: ACTIONS.ACCESS_DENIED,
  payload: {
    url,
  },
})

export const apiError = (actionName: string, error: string): AnyAction => ({
  type: ACTIONS.API_ERROR,
  payload: {
    actionName,
    error,
  },
})

export const callApi = ({
  actionName = '',
  url = '',
  method = 'GET',
  data = undefined,
  headers = undefined,
  jwtTokens = undefined,
  customOnSuccess = undefined,
  customOnFailure = undefined,
}: APIActionParameter): APIAction => ({
  type: ACTIONS.API,
  payload: {
    actionName,
    url,
    method,
    data,
    headers,
    jwtTokens,
    customOnSuccess,
    customOnFailure,
  },
})

export interface ApiStoreState {
  pendings: Array<string>
  errors: Record<string, string>
}

export const INITIAL_STATE: ApiStoreState = {
  pendings: [],
  errors: {},
}

export const reducer = (
  state: ApiStoreState = { ...INITIAL_STATE },
  action: AnyAction,
): ApiStoreState =>
  produce(state, (draftState: ApiStoreState) => {
    const newState = draftState
    switch (action.type) {
      case ACTIONS.API_START:
        newState.pendings.push(action.payload)
        delete newState.errors[action.payload]
        break
      case ACTIONS.API_ERROR:
        newState.errors[action.payload.actionName] = action.payload.error
        break
      case ACTIONS.API_END:
        newState.pendings.splice(newState.pendings.indexOf(action.payload), 1)
        break
      default:
        return newState
    }
    return newState
  })
