import '../../support/commands/customCommand'
import '../../support/commands/authentication'
import { pledgeForm } from '../../support/utils'

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

  it('Express Interest- New User', () => {
    // Click on Express Interest , to pledge a certain amount
    cy.get('button').contains('Express Interest').click()
    cy.get('[data-cy="project-cta-button"]', { timeout: 20000 }).first().click()
    pledgeForm('new')
    cy.findByText(/Thank you for your interest in /).should('exist')
  })
})
