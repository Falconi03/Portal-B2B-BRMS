import produce from 'immer'
import { AnyAction } from 'redux'
import { reducerCreator } from './common'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
 
export interface Produtos {
    produtos: []
}

export const INITIAL_STATE: Produtos = {
    produtos: [],

}

const ACTIONS = {
    GET_PRODUTOS: 'PRODUTOS/PRODUTOS',
    
}

export const actionCreators = {
    getProdutos: {
        actionName: ACTIONS.GET_PRODUTOS,
        call: (): AnyAction =>
            Api.get({
                actionName: ACTIONS.GET_PRODUTOS,
                url: `${Config.API_URL}produto/lista_produto_all_2/?limit=1000000000`,
            }),
        onActionSuccess: <T = Produtos>(state: T, action: AnyAction):T =>
            produce(state, (draftState: any) => {
                const newState = draftState
                if (action.payload) {
                    newState.produtos = action.payload.results
                }
            }),
    }
}
export const reducer = (
    state = { ...INITIAL_STATE },
    action: AnyAction,
) => reducerCreator(state, action, actionCreators)