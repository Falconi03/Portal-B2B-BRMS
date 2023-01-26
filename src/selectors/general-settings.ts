import { GeneralSettings } from '@/models'
import { StoreState } from '@/redux'
import { GeneralSettingsStoreState } from '@/redux/general-settings'

const getGeneralSettingsStore = (store: StoreState): GeneralSettingsStoreState =>
  store.generalSettings

const getSettings = (store: StoreState): GeneralSettings => getGeneralSettingsStore(store).settings

export default {
  getSettings,
}
