import { css, SerializedStyles } from '@emotion/core'

import styles from '../../../styles/variables.scss'

const { error } = styles

const Styles = {
  fieldError: (props: { error: boolean }): SerializedStyles => css`
    ${props.error ? `border-color: ${error} !important;` : ''};
  `,
}

export default Styles
