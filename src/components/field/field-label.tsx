import React, { Component } from 'react'

import { joinAll } from '@/helpers/string'

import styles from './styles.scss'

interface Props extends Partial<React.PropsWithChildren<Component>> {
  label: string | undefined
  fieldName: string | undefined
}

interface PartialProps {
  required: boolean
}

const FieldLabel = ({
  label,
  fieldName,
  required = false,
}: Props & Partial<PartialProps>): JSX.Element => (
  <label id={label} className={joinAll('form-label')} htmlFor={fieldName}>
    {label} {required ? <span className={styles.fieldRequired}> *</span> : ''}
  </label>
)

export default FieldLabel
