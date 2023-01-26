import React from 'react'

import { withRouter } from '../../../.storybook/decorators'
import { LoginScreen } from '.'

export default {
  title: 'Screens/Login',
  decorators: [withRouter],
}

export const login = (): JSX.Element => <LoginScreen />
