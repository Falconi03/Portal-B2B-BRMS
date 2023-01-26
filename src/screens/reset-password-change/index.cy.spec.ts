// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import TestIds from '../../accessibility/test-ids'
import Routes from '../../constants/routes'

context('Reset Password Change - Success', () => {
  it('Reset Password Change loaded', () => {
    cy.visit(Routes.ResetPasswordChange)
    cy.get(`[data-testid="${TestIds.resetPasswordChange.form}"]`).should('be.visible')
  })
})
