// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import TestIds from '../../accessibility/test-ids'
import Routes from '../../constants/routes'

context('Reset Password Request - Success', () => {
  it('Reset Password Request loaded', () => {
    cy.visit(Routes.ResetPasswordRequest)
    cy.get(`[data-testid="${TestIds.resetPasswordRequest.form}"]`).should('be.visible')
  })
})
