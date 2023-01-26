import React from 'react'

import { Page } from '..'
import { withRouter } from '../../../.storybook/decorators'
import { PageProps } from '.'

export default {
  title: 'Components/Page',
  decorators: [withRouter],
  args: {
    title: 'Title',
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
    },
  },
}

export const page = ({ title, ...rest }: PageProps): JSX.Element => (
  <Page title={title} {...rest}>
    <div>
      <p>Page content.</p>
    </div>
  </Page>
)
