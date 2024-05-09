/// reference types="cypress />"
/* cypress/no-unnecessary-waiting */
/* eslint-env jest */

import 'cypress-mailosaur'
import 'cypress-promise'
import '../../support/commands/customCommand'

let emailAddress = ' '

// To run this test please use following command npm run cypress:websecurity

describe('Sanity test suite on Staging', function () {
  const r = (Math.random() + 1).toString(36).substring(7)
  const serverId = 'f64pcc5w'
  const serverDomain = 'f64pcc5w.mailosaur.net'

  Cypress.on('uncaught:exception', () => {
    return false
  })
  it('Sign up with new email - basic', () => {
    emailAddress = r + '@' + serverDomain
    cy.visit('/')
    cy.contains('Sign Up').click()
    cy.task('setVar1', emailAddress)

    cy.get('a[href*="/u/signup"]').contains('Create new account').click()
    cy.get('[name=email]').clear().type(emailAddress)
    cy.get('button').contains('Continue').click()
    cy.get('[name=password]').type('Abc123!!')
    cy.get('#signup_has_agreed').check()
    cy.get('button')
      .contains('Create new account')
      .click()
    
    .then(() => {
      cy.findByLabelText('User Menu', { timeout: 65000 }).should('exist')
    })
  })
  it('Sign in with new email', () => {
    cy.visit('/')
    cy.contains('Log In').click()
    cy.get('[name=email]').clear().type(emailAddress)
    cy.get('button').contains('Continue').click()
    cy.get('[name=password]').clear().type('Abc123!!')
    cy.get('button')
      .contains('Sign in')
      .click()
      .then(() => {
        cy.findByLabelText('User Menu', { timeout: 95000 }).should('exist')
       })
  })
})
