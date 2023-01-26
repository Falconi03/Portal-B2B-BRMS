import { LocalStorageKeys } from '@/constants'

import { deleteLocalStorage, getLocalStorage, setLocalStorage } from './local-storage'

export const setAuth = (data: JWTTokens): void =>
  setLocalStorage(LocalStorageKeys.auth, JSON.stringify(data))
export const getAuth = (): JWTTokens | null => {
  const token = getLocalStorage(LocalStorageKeys.auth)
  if (token) {
    return JSON.parse(token)
  }
  return null
}
export const deleteAuth = (): void => deleteLocalStorage(LocalStorageKeys.auth)

export default {}
