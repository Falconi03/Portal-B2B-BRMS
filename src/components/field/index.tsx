import * as React from 'react'

import { joinAll } from '@/helpers/string'

import { ErrorHandler } from '../base/common-types'
import FieldError from './field-error'
import FieldLabel from './field-label'

interface RequiredProps {
  name: string
}

type DefaultProps = {
  placeholder: string | undefined
  className: string | null
  label: string
  required: boolean
}

export type FieldProps = RequiredProps & Partial<DefaultProps> & ErrorHandler

const Field = (props: FieldProps & { children: React.ReactElement }): JSX.Element => {
  const { label, name, children, required, error, className } = props
  return (
    <div className={joinAll('mb-3', className)}>
      <FieldLabel required={required} label={label} fieldName={name} />
      {children}
      <FieldError error={error} />
    </div>
  )
}

export default Field
