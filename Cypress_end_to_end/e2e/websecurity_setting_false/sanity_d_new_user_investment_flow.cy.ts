import '../../support/commands/customCommand'
import '../../support/commands/authentication'
import { recurseInvestmentSteps, cancelInvestment } from '../../support/utils'

describe('New user investment funnel', function () {
  let userEmail = ''

  before(() => {
    cy.getNewTestUser().then((user) => {
      userEmail = user.email
    })
  })

  after(() => {
    cy.deleteTestUser(userEmail)
  })

  beforeEach(() => {
    cy.setAuthCookie(userEmail, Cypress.env('userDefaultPassword'))

    Cypress.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/')
    cy.findByLabelText('User Menu', { timeout: 10000 }).should('exist')
  })

  it('Invest using credit card', () => {
    cy.visit('/invest/tuttle-twins-2')
    cy.url().then((url) => {
      const profilePage = url.split('/').pop()
      cy.url({ timeout: 30000 }).should(
        'eq',
        `${Cypress.config().baseUrl}/invest/${profilePage}`
      )
    })
    recurseInvestmentSteps('info_new', 'credit')

    cy.url().then((url) => {
      const investmentId = url.split('/').pop()
      cy.url({ timeout: 60000 }).should(
        'eq',
        `${
          Cypress.config().baseUrl
        }/investments/${investmentId}?investment_confirmation=1`
      )
    })
    cancelInvestment()
  })

  xit('Invest using ACH', function () {
    cy.visit('/invest/tuttle-twins-2')
    cy.get('#step-container-info').as('stepLabel').should('exist')
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
    cancelInvestment()
  })
})
