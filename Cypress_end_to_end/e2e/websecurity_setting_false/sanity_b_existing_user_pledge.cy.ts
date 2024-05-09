/// <reference types ="Cypress"/>
import '../../support/commands/authentication'
import 'cypress-iframe'
import '../../support/commands/customCommand'
import { pledgeForm } from '../../support/utils'

describe('Sanity test - Express Interest', () => {
  beforeEach(() => {
    cy.setAuthCookie('tip-selection@f64pcc5w.mailosaur.net', 'Abc123!!')
    Cypress.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/')
    cy.findByLabelText('User Menu', { timeout: 10000 }).should('exist')
  })

  xit('Express Interest: ', () => {
    // Click on Express Interest , to pledge a certain amount
    cy.get('button').contains('Express Interest').click()
    cy.get('[data-cy="project-cta-button"]', { timeout: 20000 }).first().click()
    pledgeForm('')
    cy.findByText(/Thank you for your interest in /).should('exist')
  })
})
