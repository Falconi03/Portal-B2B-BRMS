import { User } from '@/models'
import { StoreState } from '@/redux'
import { UserStoreState } from '@/redux/user'

const getUserStore = (store: StoreState): UserStoreState => store.user

const getUser = (store: StoreState): User | undefined => getUserStore(store).user

export default {
  getUser,
}
