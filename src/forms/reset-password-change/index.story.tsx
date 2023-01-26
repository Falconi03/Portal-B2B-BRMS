import React from 'react'

import { ResetPasswordChangeForm } from '..'
import { withRouter } from '../../../.storybook/decorators'

export default {
  title: 'Forms/ResetPasswordChange',
  decorators: [withRouter],
}

export const resetPasswordChange = (): JSX.Element => <ResetPasswordChangeForm />
