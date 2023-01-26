import React from 'react'

import { withRouter } from '../../../.storybook/decorators'
import { DashboardScreen } from '.'

export default {
  title: 'Screens/Dashboard',
  decorators: [withRouter],
}

export const dashboard = (): JSX.Element => <DashboardScreen user={undefined} />
