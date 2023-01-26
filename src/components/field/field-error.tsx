import React from 'react'

import { ErrorHandler } from '../base/common-types'
import styles from './styles.scss'

const FieldError = ({ error }: ErrorHandler): JSX.Element => (
  <span className={styles.error}>{error}</span>
)

export default FieldError
