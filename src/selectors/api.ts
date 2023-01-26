import { StoreState } from '@/redux'
import { ApiStoreState } from '@/redux/api'
import { ActionCreator } from '@/redux/common'

const getApiStore = (store: StoreState): ApiStoreState => store.api

const getLatestError = (store: StoreState, actionCreator: ActionCreator): string | undefined =>
  getApiStore(store).errors[actionCreator.actionName]

const getPending = (store: StoreState, actionCreator: ActionCreator): boolean =>
  getApiStore(store).pendings.includes(actionCreator.actionName)

export default {
  getLatestError,
  getPending,
}
