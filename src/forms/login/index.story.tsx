import React from 'react'

import { LoginForm } from '..'
import { withRouter } from '../../../.storybook/decorators'

export default {
  title: 'Forms/Login',
  decorators: [withRouter],
}

export const login = (): JSX.Element => <LoginForm />
