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

  // This is to generate current date and time dynamically
  const dayjs = require('dayjs')
  const testStart = dayjs().format('YYYY-MM-DD')

  Cypress.on('uncaught:exception', () => {
    return false
  })
  it('Sign up with new email - basic', () => {
    emailAddress = r + '@' + serverDomain
    cy.visit('/')
    cy.contains('Sign Up').click()
    cy.task('setVar1', emailAddress)
    cy.log('Date is : ', testStart)
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
  
  xit('Verify new email in the inbox and Sign in ', () => {
    return cy
      .mailosaurGetMessage(
        serverId,
        {
          sentTo: emailAddress,
        },
        {
          receivedAfter: testStart,
        }
      )
      .then((message) => {
        cy.log(message.subject)
        cy.log(message.text.links[0].href).as('verify')
        const verify = message.text.links[0].href
        cy.visit(verify)
      })
      .then(() => {
        cy.visit('/')
        cy.contains('Log In').click()
        cy.get('[name=email]').clear().type(emailAddress)
        cy.get('button').contains('Continue').click()
        cy.get('[name=password]').clear().type('Abc123!!')
        cy.get('button').contains('Sign in').click()
        cy.findByLabelText('User Menu', { timeout: 60000 }).should('exist')
        cy.get('a[href*="/test-campaign-reg-cf"]')
          .contains('Back This Project')
          .click()
        cy.get('[data-cy="project-cta-button"]').first().click()
        cy.url().then((url) => {
          const profilePage = url.split('/').pop()
          cy.url({ timeout: 30000 }).should(
            'eq',
            `${Cypress.config().baseUrl}/invest/${profilePage}`
          )
        })
      })
  })
  
  xit('Reset password- new email', () => {
    // Empty the inbox before accessing latest email
    cy.mailosaurDeleteAllMessages(serverId)
    cy.visit('/')
    cy.contains('Log In').click()
    cy.get('[name=email]').clear().type(emailAddress)
    cy.get('button').contains('Continue').click()
    cy.get('a[href*="/u/reset-password/"]').contains('Forgot password?').click()
    cy.get('button').contains('Continue').click()
    cy.wait(3000)
    return cy
      .mailosaurGetMessage(
        serverId,
        {
          sentTo: emailAddress,
        },
        {
          receivedAfter: testStart,
        }
      )
      .then((message) => {
        cy.log(message.subject)
        cy.log(message.text.body)
        const resetLink = message.text.links[0].href
        cy.log(resetLink)
        cy.visit(resetLink)
        cy.get('[name=password]').type('Abc123##')
        cy.get('[name=password_confirmation]').type('Abc123##')
        cy.get('button').contains('Set New Password').click()
      })
      .then(() => {
        cy.visit('/')
        cy.contains('Log In').click()
        cy.get('[name=email]').clear().type(emailAddress)
        cy.get('button').contains('Continue').click()
        cy.get('[name=password]').clear().type('Abc123##')
        cy.get('button').contains('Sign in').click()
        cy.findByLabelText('User Menu', { timeout: 60000 }).should('exist')
      })
  })
})
