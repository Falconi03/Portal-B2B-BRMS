import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import apiMiddleware from '@/middleware/api'
import rootSaga from '@/sagas'

import { ApiStoreState, INITIAL_STATE as ApiInitialState, reducer as api } from './api'

import {
  actionCreators as titulosReceberAC,
  TitulosReceberStoreState,
  INITIAL_STATE as TitulosReceberInitialState,
  reducer as titulosReceber,
} from './titulosreceber'
import {
  actionCreators as estoqueAC,
  EstoqueStoreState,
  INITIAL_STATE as EstoqueInitialState,

  reducer as estoque,
} from './estoque'
import {
  actionCreators as infoClienteAC,
  InfoCliente,
  INITIAL_STATE as InfoClienteInitialState,

  reducer as infoCliente,
} from './info-cliente'
import {
  actionCreators as carrinhoAC,
  Carrinho,
  INITIAL_STATE as CarrinhoInitialState,

  reducer as carrinho,
} from './carrinho'
import {
  actionCreators as produtosAC,
  Produtos,
  INITIAL_STATE as ProdutosInitialState,

  reducer as produtos,
} from './produtos'
import {
  actionCreators as generalSettingsAC,
  GeneralSettingsStoreState,
  INITIAL_STATE as GeneralSettingsInitialState,
  reducer as generalSettings,
} from './general-settings'
import {
  actionCreators as userAC,
  INITIAL_STATE as UserInitialState,
  reducer as user,
  UserStoreState,
} from './user'

export interface IAppSate {
  dispatch: (payload: Record<string, unknown>) => AnyAction
}

export interface StoreState {
  api: ApiStoreState
  estoque: EstoqueStoreState
  carrinho: Carrinho
  infoCliente: InfoCliente
  produtos: Produtos
  titulosReceber: TitulosReceberStoreState
  generalSettings: GeneralSettingsStoreState
  user: UserStoreState
}

const rootReducer = combineReducers({
  api,
  estoque,
  carrinho,
  infoCliente,
  produtos,
  titulosReceber,
  generalSettings,
  user,
})

export const InitialState = {
  api: ApiInitialState,
  estoque: EstoqueInitialState,
  carrinho: CarrinhoInitialState,
  infoCliente: InfoClienteInitialState,
  produtos: ProdutosInitialState,
  titulosReceber: TitulosReceberInitialState,
  generalSettings: GeneralSettingsInitialState,
  user: UserInitialState,
}

export const ActionCreators = {
  estoque: estoqueAC,
  carrinho: carrinhoAC,
  infoCliente: infoClienteAC,
  produtos: produtosAC,
  titulosReceber: titulosReceberAC,
  generalSettings: generalSettingsAC,
  user: userAC,
}

// Strange higher-order function to potentially modify the result
const logAction = (store: StoreState) => (next: (action: AnyAction) => void) => (
  action: AnyAction,
) => {
  // @ts-ignore
  const before = store.getState()
  const result = next(action)
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // Group these console logs into one closed group
    /* eslint-disable no-console */
    // @ts-ignore
    const after = store.getState()
    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('BEFORE', before)
    console.log('ACTION', action.type, action)
    console.log('AFTER', after)
    console.groupEnd()
    /* eslint-enable no-console */
  }

  return result
}

const configureStore = (
  initialState: StoreState = InitialState,
): Store<CombinedState<StoreState>> => {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error: Error) => {
      console.error(error) // eslint-disable-line no-console
      // Send the error to some error tracker
    },
  })
  const middlewares = [sagaMiddleware, logAction, apiMiddleware]
  // @ts-ignore
  let middleware = applyMiddleware(...middlewares)

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any // eslint-disable-line @typescript-eslint/no-explicit-any
    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      middleware = compose(middleware, __REDUX_DEVTOOLS_EXTENSION__())
    }
  }

  const store = createStore(rootReducer, initialState, middleware)
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
