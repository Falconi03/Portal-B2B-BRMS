import produce from 'immer'
import { AnyAction } from 'redux'

import Config from '@/config'
import { Api } from '@/helpers/services/api'
import { TitulosReceber } from '@/models/'

import { reducerCreator } from './common'
import { titulosReceberNormalizer } from './schema'
import { TitulosAbertosPayload, TitulosPagosPayload } from '@/models/titulos-receber'

export interface TitulosReceberStoreState {
  titulos: Array<TitulosReceber>
  paginas: number
}

export const INITIAL_STATE: TitulosReceberStoreState = {
  titulos: new Array<TitulosReceber>(),
  paginas: 0,
}

const ACTIONS = {
  GET_TITULOS_RECEBER: 'TITULOS/TITULOSRECEBER',
}

export const actionCreators = {

  getTitulosPagos: {
    actionName: ACTIONS.GET_TITULOS_RECEBER,
    call: ( payload: TitulosPagosPayload): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_TITULOS_RECEBER,
        url: `${Config.API_URL}titulosreceber/titulospagos/?limit=1000000000&offset=${0}`,
        data: payload.toJSON() as Record<string, unknown>,
      }),
    onActionSuccess: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          const titulos = new Array<TitulosReceber>()
          for (let index = 0; index < action.payload.results.length; index++) {
            const titulosReceber = action.payload.results[index]
            normalized = titulosReceberNormalizer(titulosReceber)
            const updatedTitulosReceber = normalized.entities.titulosReceber[normalized.result]
            titulos.push(updatedTitulosReceber)
          }
          newState.paginas = action.payload.count / 1000000000
          newState.titulos = titulos
        }
        else {
          newState.paginas = 0
          newState.titulos = new Array<TitulosReceber>()
        }
      }),
    onActionFailed: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        newState.paginas = 0
        newState.titulos = new Array<TitulosReceber>()
      }),
  },

  getTitulosAbertos: {
    actionName: ACTIONS.GET_TITULOS_RECEBER,
    call: (payload: TitulosAbertosPayload): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_TITULOS_RECEBER,
        url: `${Config.API_URL}titulosreceber/titulosabertos/?limit=1000000000&offset=${0}`,
        data: payload.toJSON() as Record<string, unknown>,
      }),
    onActionSuccess: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          const titulos = new Array<TitulosReceber>()
          for (let index = 0; index < action.payload.results.length; index++) {
            const titulosReceber = action.payload.results[index]
            normalized = titulosReceberNormalizer(titulosReceber)
            const updatedTitulosReceber = normalized.entities.titulosReceber[normalized.result]
            titulos.push(updatedTitulosReceber)
          }
          newState.paginas = action.payload.count / 1000000000
          newState.titulos = titulos
        }
        else {
          newState.paginas = 0
          newState.titulos = []
        }
      }),
      onActionFailed: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        newState.paginas = 0
        newState.titulos = new Array<TitulosReceber>()
      }),
  },

  getVencidos: {
    actionName: ACTIONS.GET_TITULOS_RECEBER,
    call: (page: number): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_TITULOS_RECEBER,
        url: `${Config.API_URL}titulosreceber/vencidos/?limit=1000000000&offset=${page * 50}`,
      }),
    onActionSuccess: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          const titulos = new Array<TitulosReceber>()
          for (let index = 0; index < action.payload.results.length; index++) {
            const titulosReceber = action.payload.results[index]
            normalized = titulosReceberNormalizer(titulosReceber)
            const updatedTitulosReceber = normalized.entities.titulosReceber[normalized.result]
            titulos.push(updatedTitulosReceber)
          }
          newState.paginas = action.payload.count / 1000000000
          newState.titulos = titulos
        }
        else {
          newState.paginas = 0
          newState.titulos = []
        }
      }),
      onActionFailed: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        newState.paginas = 0
        newState.titulos = new Array<TitulosReceber>()
      }),
  },
  
  getVencimentoProximo: {
    actionName: ACTIONS.GET_TITULOS_RECEBER,
    call: (page: number): AnyAction =>
      Api.get({
        actionName: ACTIONS.GET_TITULOS_RECEBER,
        url: `${Config.API_URL}titulosreceber/vencimentoproximo/?limit=1000000000&offset=${page * 50}`,
      }),
    onActionSuccess: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        let normalized
        if (action.payload) {
          const titulos = new Array<TitulosReceber>()
          for (let index = 0; index < action.payload.results.length; index++) {
            const titulosReceber = action.payload.results[index]
            normalized = titulosReceberNormalizer(titulosReceber)
            const updatedTitulosReceber = normalized.entities.titulosReceber[normalized.result]
            titulos.push(updatedTitulosReceber)
          }
          newState.paginas = action.payload.count / 1000000000
          newState.titulos = titulos
        }
        else {
          newState.paginas = 0
          newState.titulos = []
        }
      }),
      onActionFailed: <T = TitulosReceberStoreState>(state: T, action: AnyAction): T =>
      produce(state, (draftState: TitulosReceberStoreState) => {
        const newState = draftState
        newState.paginas = 0
        newState.titulos = new Array<TitulosReceber>()
      }),
  }
}

export const reducer = (
  state: TitulosReceberStoreState = { ...INITIAL_STATE },
  action: AnyAction,
): TitulosReceberStoreState => reducerCreator<TitulosReceberStoreState>(state, action, actionCreators)
