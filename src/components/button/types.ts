export enum Size {
  large = 'btn-lg',
  small = 'btn-sm',
}

export enum variant {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  success = 'btn-success',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info',
  light = 'btn-light',
  dark = 'btn-dark',
}

export interface DefaultProps {
  ariaLabel: string
  title: string
  variant: variant
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  type: 'button' | 'submit'
  fakeDisabled: boolean
  disabled: boolean
  children: React.ReactNode | null
  size?: Size
  testId?: string | undefined
}

type ButtonProps = Partial<DefaultProps>

export default ButtonProps
