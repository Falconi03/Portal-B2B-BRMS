import React from 'react'

import { withRouter } from '../../../.storybook/decorators'
import { ResetPasswordChangeScreen } from '.'

export default {
  title: 'Screens/ResetPasswordChange',
  decorators: [withRouter],
}

export const resetPasswordChange = (): JSX.Element => <ResetPasswordChangeScreen />
