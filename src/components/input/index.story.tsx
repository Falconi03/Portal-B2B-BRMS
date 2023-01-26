import React from 'react'

import { Input } from '..'
import { emptyFunction } from '../../../__mocks__'
import { InputProps } from '.'

export default {
  title: 'Components/Input',
  args: {
    label: 'Input label',
    placeholder: 'Placeholder',
    error: null,
    required: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      control: { type: 'text' },
    },
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
    },
    error: {
      name: 'Error message',
      control: { type: 'text' },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
    },
  },
}

export const textInput = ({ placeholder, ariaLabel, ...args }: InputProps): JSX.Element => (
  <Input
    ariaLabel={ariaLabel}
    name="input"
    placeholder={placeholder}
    onChange={emptyFunction}
    type="text"
    {...args}
  />
)

export const requiredTextInput = ({ placeholder, ariaLabel, ...args }: InputProps): JSX.Element => (
  <Input
    ariaLabel={ariaLabel}
    name="requiredInput"
    placeholder={placeholder}
    onChange={emptyFunction}
    type="text"
    {...args}
    required
    error="Error message"
  />
)
