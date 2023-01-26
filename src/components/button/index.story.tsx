import React from 'react'

import { Button } from '..'
import { emptyFunction } from '../../../__mocks__'
import { SecondaryButton } from '.'
import { Size } from './types'

export default {
  title: 'Components/Button',
  args: {
    title: 'Button title',
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
    },
    size: {
      name: 'Size',
      options: [Size.small, Size.large],
      control: { type: 'radio' },
    },
  },
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const primary = ({ ...args }): JSX.Element => (
  <Button ariaLabel="primary button" onClick={emptyFunction} {...args} />
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const secondary = ({ ...args }): JSX.Element => (
  <SecondaryButton ariaLabel="secondary button" onClick={emptyFunction} {...args} />
)
