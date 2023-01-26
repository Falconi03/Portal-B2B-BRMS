import config from '../config'
import useScript from './use-script'

export const staticPath = (path: string): string =>
  CYPRESS || STORYBOOK ? path : `${config.staticPath}/${path}`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-empty-function
export const emptyFn = () => {}

export default {
  useScript,
}
