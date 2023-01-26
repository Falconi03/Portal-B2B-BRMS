import React from 'react'

import { Button, ButtonsWrapper, SecondaryButton } from '..'

export default {
  title: 'Components/ButtonsWrapper',
}

export const twoButtons = (): JSX.Element => (
  <ButtonsWrapper>
    <>
      <SecondaryButton title="Secondary" type="button" />
      <Button title="Primary" type="button" />
    </>
  </ButtonsWrapper>
)

export const oneButton = (): JSX.Element => (
  <ButtonsWrapper>
    <>
      <Button title="Primary" type="button" />
    </>
  </ButtonsWrapper>
)
