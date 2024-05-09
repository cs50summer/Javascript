/**
 * Navigates to desired url, if not currently there
 * @param desiredUrl string value
 * @example
 * // this command
 * cy.navToUrl('http://localhost:3000/')
 * // will navigate to the url, if not currently there
 */

Cypress.Commands.add('navToUrl', (input: string) => {
  Cypress.log({
    consoleProps() {
      return {
        url: input,
      }
    },
    displayName: 'navToUrl',
    name: 'Navigate to URL, if not currently there.',
  })

  cy.url().then((url) => {
    if (url !== Cypress.config().baseUrl + input) {
      return cy.visit(input)
    } else {
      cy.log('Currently at the desired URL - no need to navigate.')
    }
  })
})
