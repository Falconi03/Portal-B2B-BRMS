export const getLocalStorage = (name: string): string | null => localStorage.getItem(name)

export const setLocalStorage = (name: string, data: string): void => {
  localStorage.setItem(name, data)
}

export const deleteLocalStorage = (name: string): void => {
  localStorage.setItem(name, '')
}

export default {}
