/** @jsx jsx */
import { jsx } from '@emotion/core'

import { joinAll } from '@/helpers/string'
import InputMask from 'react-input-mask'
import commonJsStyles from '../base/common-styles'
import { UserInputFieldProps } from '../base/common-types'
import Field, { FieldProps } from '../field'
import styles from './styles.scss'

export type DefaultProps = {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
  onBlur: ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
  ariaLabel: string | undefined
  value: string | undefined
  mask: any
  maxLength: number | undefined
  inputType: 'text' | 'password' | undefined
}

export type InputProps = FieldProps & Partial<DefaultProps> & Partial<UserInputFieldProps>

const Input = (props: InputProps): JSX.Element => {
  const {
    name,
    placeholder,
    maxLength,
    ariaLabel,
    label,
    testId,
    error,
    inputType,
    value,
    mask,
    ...rest
  } = props

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { onFocus } = props
    if (onFocus) {
      onFocus(e)
    }
  }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { onBlur } = props
    if (onBlur) {
      onBlur(e)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = props
    if (onChange) {
      onChange(e)
    }
  }

  // Delete props that shouldn't be passed to the dom
  delete rest.onChange
  delete rest.onFocus
  delete rest.onBlur

  return (
    <Field name={name} error={error} label={label} {...rest}>
      <InputMask
        name={name}
        placeholder={placeholder}
        aria-label={ariaLabel ?? label ?? placeholder}
        className={joinAll('form-control', styles.input)}
        type={inputType ?? 'text'}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onInputChange}
        maxLength={maxLength}
        data-testid={testId}
        autoComplete="off"
        value={value}
        mask={mask}
       /*  css={commonJsStyles.fieldError({ error: !!error })} */
      />
    </Field>
  )
}

export default Input
