import '../../support/commands/authentication'
import '../../support/commands/customCommand'
import { recurseInvestmentSteps, paymentUpdateFlow } from '../../support/utils'

// Two roadblocks in developeing this:
// 1. The Test CC Failed field does not immediately realy failed payment in the backend , due to which the Front-end payment status shows as Pending
// 2. Even if payment status is marked as Failed , the Update button is not activated in the My Investments page .This is true only for CC , not ACH

describe('Sanity on Staging with express checkout changes', function () {
  beforeEach(() => {
    cy.setAuthCookie('quiet-train@f64pcc5w.mailosaur.net', 'Abc123!!')
    Cypress.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/')
    cy.findByLabelText('User Menu', { timeout: 10000 }).should('exist')
  })
  xit('Invest using Credit Card', { defaultCommandTimeout: 65000 }, () => {
    cy.visit('/invest/tuttle-twins-2')
    cy.get('#step-container-info').as('stepLabel').should('exist')

    // Since the Investor Profile is already created , the steps can recurse from Amount section .
    // Express Checkout doesn't need multiple recursion steps .
    recurseInvestmentSteps('amount', 'credit_fail')

    cy.url().then((url) => {
      const investmentId = url.split('/').pop()
      cy.url({ timeout: 60000 }).should(
        'eq',
        `${
          Cypress.config().baseUrl
        }/investments/${investmentId}?investment_confirmation=1`
      )
    })
    paymentUpdateFlow()
  })

  xit('cancel Investment', () => {
    cy.cancelInvestment()
  })
})
