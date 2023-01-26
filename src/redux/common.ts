import { AnyAction } from 'redux'

import { ApiStoreState } from './api'
import { GeneralSettingsStoreState } from './general-settings'
import { UserStoreState } from './user'

export type AppState = GeneralSettingsStoreState | UserStoreState | ApiStoreState

export type ActionCreator = {
  actionName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call: (payload: any) => void
  onActionSuccess?: <T>(state: T, action: AnyAction) => T
  onActionFailed?: <T>(state: T, action: AnyAction) => T
}

export const getSuccessActionName = (actionName: string): string => `${actionName}_SUCCESS`
export const getFailureActionName = (actionName: string): string => `${actionName}_FAILURE`

export const reducerCreator = <T>(
  state: T,
  action: AnyAction,
  actionCreators: Record<string, ActionCreator>,
): T => {
  let newState = { ...state }
  Object.entries(actionCreators).forEach(([key]) => {
    const actionCreator = actionCreators[key]
    if (
      actionCreator.onActionSuccess &&
      getSuccessActionName(actionCreator.actionName) === action.type
    ) {
      newState = actionCreator.onActionSuccess(state, action)
    }
    if (
      actionCreator.onActionFailed &&
      getFailureActionName(actionCreator.actionName) === action.type
    ) {
      newState = actionCreator.onActionFailed(state, action)
    }
  })
  return newState
}
