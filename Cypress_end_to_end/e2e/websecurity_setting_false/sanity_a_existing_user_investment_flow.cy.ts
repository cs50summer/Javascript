/// <reference types="Cypress-iframe" />
/// <reference types = "Cypress"/>
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-env jest */
import '../../support/commands/authentication'
import 'cypress-iframe'
import '../../support/commands/customCommand'
import { recurseInvestmentSteps } from '../../support/utils'

describe('Sanity on Staging with express checkout changes', function () {
  beforeEach(() => {
    cy.setAuthCookie('tip-selection@f64pcc5w.mailosaur.net', 'Abc123!!')
    Cypress.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/')
    cy.findByLabelText('User Menu', { timeout: 10000 }).should('exist')
  })
  it('Invest using Credit Card', { defaultCommandTimeout: 65000 }, () => {
    cy.visit('/invest/tuttle-twins-2')
    cy.get('#step-container-info').as('stepLabel').should('exist')

    // Since the Investor Profile is already created , the steps can recurse from Amount section .
    // Express Checkout doesn't need multiple recursion steps .
    recurseInvestmentSteps('amount', 'credit_old')

    cy.url().then((url) => {
      const investmentId = url.split('/').pop()
      cy.url({ timeout: 60000 }).should(
        'eq',
        `${
          Cypress.config().baseUrl
        }/investments/${investmentId}?investment_confirmation=1`
      )
    })
  })

  xit('cancel Investment', () => {
    cy.cancelInvestment()
  })

  xit('Invest using E-Check', { defaultCommandTimeout: 65000 }, function () {
    cy.visit('/invest/tuttle-twins-2')
    cy.get('#step-container-info').as('stepLabel').should('exist')

    // Since the Investor Profile is already created , the steps can recurse from Amount section .
    // Express Checkout doesn't need multiple recursion steps .
    recurseInvestmentSteps('amount', 'ach')

    cy.url().then((url) => {
      const investmentId = url.split('/').pop()
      cy.url({ timeout: 60000 }).should(
        'eq',
        `${
          Cypress.config().baseUrl
        }/investments/${investmentId}?investment_confirmation=1`
      )
    })
  })

  xit('cancel Investment', () => {
    cy.cancelInvestment()
  })
  xit('Invest using Bank ', { defaultCommandTimeout: 50000 }, function () {
    cy.visit('/invest/tuttle-twins-2')
    cy.get('#step-container-info').as('stepLabel').should('exist')

    // Since the Investor Profile is already created , the steps can recurse from Amount section .
    // Express Checkout doesn't need multiple recursion steps .
    recurseInvestmentSteps('amount', 'bank')

    cy.url().then((url) => {
      const investmentId = url.split('/').pop()
      cy.url({ timeout: 60000 }).should(
        'eq',
        `${
          Cypress.config().baseUrl
        }/investments/${investmentId}?investment_confirmation=1`
      )
    })
  })
  xit('cancel Investment', () => {
    cy.cancelInvestment()
  })
})
