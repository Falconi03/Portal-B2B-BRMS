import { css, SerializedStyles } from '@emotion/core'

const Styles = {
  button: (fakeDisabled: boolean | undefined): SerializedStyles => css`
    :hover {
      opacity: 0.7;
    }

    ${fakeDisabled && `opacity: 0.3; cursor: default; :hover {opacity: 0.3;}`}
  `,
}
export default Styles
