import { staticPath } from '@/helpers'

import Strings from './strings'

// Do not forget to add the image to .storybook/static-loader.js to be loaded by the static storybook
export const Images = {
  logo: staticPath('images/logo.svg'),
}

export const AppContentID = 'app-content-id'

export const LocalStorageKeys = {
  auth: 'auth',
}

export const externalLibriaries = {
  dummy: 'https://dummy.dummy/dummy.js',
}

export default Strings
