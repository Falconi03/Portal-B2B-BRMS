import produce from 'immer'
import { AnyAction } from 'redux'
import { reducerCreator } from './common'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
 
export interface Carrinho {
    carrinho: []
}

export const INITIAL_STATE: Carrinho = {
    carrinho: [],

}

const ACTIONS = {
    GET_CARRINHO: 'CARRINHO/CARRINHO_PRODUTOS',
    ADD_PRODUTOS: 'CARRINHO/ADD_PRODUTOS'
}

export const actionCreators = {
    getCarrinhoProdutos: {
        actionName: ACTIONS.GET_CARRINHO,
        call: (): AnyAction =>
            Api.get({
                actionName: ACTIONS.GET_CARRINHO,
                url: `${Config.API_URL}pedido/pedido/`,
            }),
        onActionSuccess: <T = Carrinho>(state: T, action: AnyAction):T =>
            produce(state, (draftState: any) => {
                const newState = draftState
                if (action.payload) {
                    newState.carrinho = action.payload.results
                }
            }),
    }
}
export const reducer = (
    state = { ...INITIAL_STATE },
    action: AnyAction,
) => reducerCreator(state, action, actionCreators)