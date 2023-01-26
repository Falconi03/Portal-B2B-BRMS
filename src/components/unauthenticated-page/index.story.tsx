import React from 'react'

import { UnauthenticatedPage } from '..'
import { PageProps } from '.'

export default {
  title: 'Components/UnauthenticatedPage',
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

export const unauthenticatedPage = ({ title, ...rest }: PageProps): JSX.Element => (
  <UnauthenticatedPage title={title} {...rest}>
    <div>
      <p>Unauthenticated page content.</p>
    </div>
  </UnauthenticatedPage>
)
