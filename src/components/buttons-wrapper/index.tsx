import React from 'react'

import styles from './styles.scss'

export type ButtonsWrapperProps = {
  children: React.ReactNode | null
}

const ButtonsWrapper = ({ children }: ButtonsWrapperProps): JSX.Element => (
  <div className={styles.buttonWrapper}>{children}</div>
)

export default ButtonsWrapper
