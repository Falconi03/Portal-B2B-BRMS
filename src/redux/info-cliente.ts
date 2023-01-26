import produce from 'immer'
import { AnyAction } from 'redux'
import { reducerCreator } from './common'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
 
export interface InfoCliente {
    infoCliente: []
}

export const INITIAL_STATE: InfoCliente = {
    infoCliente: [],

}

const ACTIONS = {
    GET_INFO_CLIENTE: 'INFO_CLIENTE/INFO_CLIENTE',
}

export const actionCreators = {
    getInfoCliente: {
        actionName: ACTIONS.GET_INFO_CLIENTE,
        call: (): AnyAction =>
            Api.get({
                actionName: ACTIONS.GET_INFO_CLIENTE,
                url: `${Config.API_URL}cliente/get_cliente/`,
            }),
        onActionSuccess: <T = InfoCliente>(state: T, action: AnyAction):T =>
            produce(state, (draftState: any) => {
                const newState = draftState
                if (action.payload) {
                    newState.infoCliente = action.payload.results
                }
            }),
    }
}
export const reducer = (
    state = { ...INITIAL_STATE },
    action: AnyAction,
) => reducerCreator(state, action, actionCreators)