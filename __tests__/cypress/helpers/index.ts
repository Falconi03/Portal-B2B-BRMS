// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import { format } from 'date-fns'

export const generateRandomLicensePlateSulfix = (): string =>
  Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString()

export const selectOptionOnDropdown = (testId: string, optionIndex = 1): void => {
  cy.get(`[data-testid="${testId}"] .react-dropdown-select-content >input`).click()
  cy.get(`[data-testid="${testId}"] span[role="option"]:nth-of-type(${optionIndex})`).click()
}

export const selectDateOnDatePicker = (testId: string, date = new Date()): void => {
  cy.get(`[data-testid="${testId}"] input`).type(format(date, 'dd/MM/yyyy')).type('{esc}');
}
