import produce from 'immer'
import { AnyAction } from 'redux'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
import { EstoqueSaldo } from '@/models/'

import { reducerCreator } from './common'
import { estoqueSaldoNormalizer } from './schema'

export interface EstoqueStoreState {
  saldos: Array<EstoqueSaldo>
  paginas: number
}

export const INITIAL_STATE: EstoqueStoreState = {
  saldos: new Array<EstoqueSaldo>(),
  paginas: 0,
}

const ACTIONS = {
  GET_ESTOQUE_SALDO: 'ESTOQUE/ESTOQUE_SALDO',
}

export const actionCreators = {
  getEstoqueSaldo: {
    actionName: ACTIONS.GET_ESTOQUE_SALDO,
    call: (page: number): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_ESTOQUE_SALDO,
        url: `${Config.API_URL}estoque/saldo/?limit=1000000000&offset=${page * 10}`,
      }),
    onActionSuccess: <T = EstoqueStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: EstoqueStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          const saldos = new Array<EstoqueSaldo>()
          for (let index = 0; index < action.payload.results.length; index++) {
            const estoque = action.payload.results[index]
            normalized = estoqueSaldoNormalizer(estoque)
            const updatedEstoqueSaldo = normalized.entities.estoqueSaldo[normalized.result]
            saldos.push(updatedEstoqueSaldo)
          }
          newState.paginas = action.payload.count / 1000000000
          newState.saldos = saldos
        }
      }),
  },
}

export const reducer = (
  state: EstoqueStoreState = { ...INITIAL_STATE },
  action: AnyAction,
): EstoqueStoreState => reducerCreator<EstoqueStoreState>(state, action, actionCreators)
