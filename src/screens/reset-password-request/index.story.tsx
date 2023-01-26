import React from 'react'

import { withRouter } from '../../../.storybook/decorators'
import { ResetPasswordRequestScreen } from '.'

export default {
  title: 'Screens/ResetPasswordRequest',
  decorators: [withRouter],
}

export const resetPasswordRequest = (): JSX.Element => <ResetPasswordRequestScreen />
