/// <reference types ="Cypress"/>
/* eslint-env jest */

import '../../support/commands/authentication'
import 'cypress-promise'
import '../../support/commands/customCommand'
import { recurseInvestmentSteps } from '../../support/utils'

describe('Entity investment flow for existing users', () => {
  beforeEach(() => {
    cy.setAuthCookie('quiet-train@f64pcc5w.mailosaur.net', 'Abc123!!')
    Cypress.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/')
    cy.findByLabelText('User Menu', { timeout: 10000 }).should('exist')
  })
  xit(
    'Entity investment flow for existing user',
    { defaultCommandTimeout: 50000 },
    function () {
      cy.visit('/invest/tuttle-twins-2')
      cy.get('#step-container-info').as('stepLabel').should('exist')
      // Since the Investor Profile is already created , the steps can recurse from entity creation section .
      // Express Checkout doesn't need multiple recursion steps .
      cy.get('[data-testid="meta\\.isEntity"]')
        .contains('NO')
        .click({ force: true })
        .should('contain', 'YES')
      cy.get('button').contains('Add New').click()
      recurseInvestmentSteps('entity')

      cy.url().then((url) => {
        const investmentId = url.split('/').pop()
        cy.url({ timeout: 60000 }).should(
          'eq',
          `${
            Cypress.config().baseUrl
          }/investments/${investmentId}?investment_confirmation=1`
        )
      })
    }
  )

  xit('Cancel investement', () => {
    cy.cancelInvestment()
  })
})
