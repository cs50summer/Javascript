import '../../support/commands/customCommand'
import '../../support/commands/authentication'

describe('Active check user sign up sign in', function () {
  let userEmail = 'angelfundingtest7@gmail.com'
  let password ='Abc123!!'

  it ('Sign in with the new user', function(){

        cy.log(`Base URL: ${Cypress.config().baseUrl}`)
        console.log(`Base URL: ${Cypress.config().baseUrl}`)
        cy.visit('/')
        cy.contains('Log In').click()
        cy.get('[name=email]').clear().type(userEmail)
        cy.get('button').contains('Continue').click()
        cy.get('[name=password]').clear().type(password)
        cy.get('button')
          .contains('Sign in')
          .click()
        cy.findByLabelText('User Menu', { timeout: 25000 }).should('exist')
        
         })
})

