import { useLocation } from 'react-router-dom'

export const getQueryString = (param: string): string | null => {
  if (STORYBOOK) return param
  return new URLSearchParams(useLocation().search).get(param)
}

export default {}
