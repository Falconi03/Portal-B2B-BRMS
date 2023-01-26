import React from 'react'

import { withRouter } from '../../../.storybook/decorators'
import { EstoqueScreen } from '.'

export default {
  title: 'Screens/Dashboard',
  decorators: [withRouter],
}

export const dashboard = (): JSX.Element => <EstoqueScreen saldos={undefined} />
