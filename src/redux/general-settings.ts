import produce from 'immer'
import { AnyAction } from 'redux'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
import { GeneralSettings } from '@/models/'

import { reducerCreator } from './common'
import { generalSettingsNormalizer } from './schema'

export interface GeneralSettingsStoreState {
  settings: GeneralSettings
}

export const INITIAL_STATE: GeneralSettingsStoreState = {
  settings: new GeneralSettings(),
}

const ACTIONS = {
  GET_GENERAL_SETTINGS: 'GENERAL_SETTINGS/GET_GENERAL_SETTINGS',
}

export const actionCreators = {
  getGeneralSettings: {
    actionName: ACTIONS.GET_GENERAL_SETTINGS,
    call: (): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_GENERAL_SETTINGS,
        url: `${Config.API_URL}general/settings/`,
      }),
    onActionSuccess: <T = GeneralSettingsStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: GeneralSettingsStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          normalized = generalSettingsNormalizer(action.payload.data)
          const updatedGeneralSettings = normalized.entities.generalSettings[normalized.result]
          newState.settings = updatedGeneralSettings
        }
      }),
  },
}

export const reducer = (
  state: GeneralSettingsStoreState = { ...INITIAL_STATE },
  action: AnyAction,
): GeneralSettingsStoreState =>
  reducerCreator<GeneralSettingsStoreState>(state, action, actionCreators)
