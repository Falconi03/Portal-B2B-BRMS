import { useFormikContext } from 'formik'
import React from 'react'

import { Input } from '@/components'
import { InputProps } from '@/components/input'

const addFormikFieldProps = (name: string) => {
  const {
    errors,
    values,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    setTouched,
    touched,
  } = useFormikContext()
  // @ts-ignore
  const error = touched[name] && errors[name]
  // @ts-ignore
  const value = values[name]
  return {
    error,
    value,
    onBlur: handleBlur,
    onFocus: () => setFieldTouched(name),
    onChange: (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | boolean
        | string
        | number
        | Array<string>
        | Date,
    ) => {
      let v = e
      if (typeof e === 'object' && 'target' in e) {
        v = e.target.value
      }
      setTouched({ ...touched, [name]: true }, true)
      setFieldValue(name, v)
    },
  }
}

export const TextField = ({ name, ...rest }: InputProps): JSX.Element => (
  <Input name={name} {...rest} {...addFormikFieldProps(name)} />
)

export const PasswordField = ({ name, ...rest }: InputProps): JSX.Element => (
  <Input name={name} inputType="password" {...rest} {...addFormikFieldProps(name)} />
)
