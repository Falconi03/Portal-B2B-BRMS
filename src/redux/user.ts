import produce from 'immer'
import { AnyAction } from 'redux'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
import User, {
  LoginPayload,
  ResetPasswordChangePayload,
  ResetPasswordRequestPayload,
} from '@/models/user'

import { reducerCreator } from './common'
import { userNormalizer } from './schema'

export interface UserStoreState {
  user: User | undefined
}

export const INITIAL_STATE: UserStoreState = {
  user: undefined,
}

export const ACTIONS = {
  LOGIN: 'USER/LOGIN',
  LOGOUT: 'USER/LOGOUT',
  RESET_PASSWORD_REQUEST: 'USER/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_CHANGE: 'USER/RESET_PASSWORD_CHANGE',
  TOKEN_REFRESH: 'USER/TOKEN_REFRESH',
  GET_USER: 'USER/GET_USER',
}

export const actionCreators = {
  login: {
    actionName: ACTIONS.LOGIN,
    call: (payload: LoginPayload): AnyAction =>
      Api.post({
        actionName: ACTIONS.LOGIN,
        url: `${Config.API_URL}accounts/login/`,
        data: payload.toJSON() as Record<string, unknown>,
      
      }),
    onActionSuccess: <T = UserStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: UserStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          normalized = userNormalizer(action.payload.data)
          const updatedUser = normalized.entities.user[normalized.result]
          newState.user = updatedUser
        }
      }),
  },
  logout: {
    actionName: ACTIONS.LOGOUT,
    call: (refreshToken: string): AnyAction =>
      Api.post({
        actionName: ACTIONS.LOGOUT,
        url: `${Config.API_URL}accounts/logout/`,
        data: { refresh: refreshToken },
      }),
    onActionSuccess: <T = UserStoreState>(state: T): T =>
      produce(state, (draftState: UserStoreState) => {
        const newState = draftState
        newState.user = undefined
      }),
  },
  resetPasswordRequest: {
    actionName: ACTIONS.RESET_PASSWORD_REQUEST,
    call: (payload: ResetPasswordRequestPayload): AnyAction =>
      Api.post({
        actionName: ACTIONS.RESET_PASSWORD_REQUEST,
        url: `${Config.API_URL}accounts/reset-password-request/`,
        data: payload.toJSON() as Record<string, unknown>,
      }),
  },
  resetPasswordChange: {
    actionName: ACTIONS.RESET_PASSWORD_CHANGE,
    call: (payload: ResetPasswordChangePayload): AnyAction =>
      Api.post({
        actionName: ACTIONS.RESET_PASSWORD_CHANGE,
        url: `${Config.API_URL}accounts/reset-password-change/`,
        data: payload.toJSON() as Record<string, unknown>,
      }),
  },
  updateUser: {
    actionName: ACTIONS.GET_USER,
    call: (): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_USER,
        url: `${Config.API_URL}accounts/me/`,
      }),
    onActionSuccess: <T = UserStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: UserStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          normalized = userNormalizer(action.payload.data)
          const updatedUser = normalized.entities.user[normalized.result]
          newState.user = updatedUser
        }
      }),
  },
}

export const reducer = (
  state: UserStoreState = { ...INITIAL_STATE },
  action: AnyAction,
): UserStoreState => reducerCreator<UserStoreState>(state, action, actionCreators)
