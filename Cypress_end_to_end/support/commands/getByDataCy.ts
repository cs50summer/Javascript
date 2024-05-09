import { Selectors } from '../@types/selectors'

/**
 * Gets element using data-cy selector
 * @param input data-cy attribute value
 * @example
 * // this command
 * cy.getByDataCy('header')
 * // will select this element
 * <div data-cy="header">
 * </div>
 *
 */

Cypress.Commands.add('getByDataCy', (input: Selectors) => {
  Cypress.log({
    consoleProps() {
      return {
        selector: input,
      }
    },
    displayName: 'getByDataCy',
    name: 'Get by [data-cy] attribute',
  })

  return cy.get(`[data-cy='${input}']`)
})
