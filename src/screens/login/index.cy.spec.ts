// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import TestIds from '../../accessibility/test-ids'
import Routes from '../../constants/routes'

context('Login - Success', () => {
  it('Login loaded', () => {
    cy.visit(Routes.Login)
    cy.get(`[data-testid="${TestIds.login.form}"]`).should('be.visible')
  })
})
