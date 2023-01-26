/** @jsx jsx */
import { jsx } from '@emotion/core'

import { joinAll } from '@/helpers/string'

import jsStyles from './styles'
import styles from './styles.scss'
import ButtonProps, { variant as buttonVariants } from './types'

const Button = (props: ButtonProps): JSX.Element => {
  const {
    ariaLabel,
    children,
    onClick,
    title,
    type,
    size,
    variant,
    fakeDisabled,
    className,
    testId,
    ...rest
  }: ButtonProps = props

  return (
    <button
      type={type} // eslint-disable-line react/button-has-type
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className={joinAll('btn', size, variant ?? buttonVariants.primary, styles.button, className)}
      /* css={jsStyles.button(fakeDisabled)} */
      data-testid={testId}
      {...rest}
    >
      {children}
      {title ? <span>{title}</span> : null}
    </button>
  )
}

export const SecondaryButton = (props: ButtonProps): React.ReactElement => (
  <Button variant={buttonVariants.secondary} {...props} />
)

export default Button
