import { Selectors } from './@types/selectors'
import { User } from '../../src/services/api/user'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Perform GET request on given API URL.
       * @param  {string} - The URL to request from
       *
       * @example cy.getRequest('some-url')
       */
      getRequest(input: string): Chainable<Response<any>>

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
      getByDataCy(input: Selectors): Chainable<JQuery<Element>>

      /**
       * Checks if the element is in the viewport. Top of element must be within viewport,
       * but the bottom of the element may extend beyond the viewport.
       * @example cy.getByDataCy('some-id').isInViewport()
       */
      isInViewport(): Chainable<any>

      /**
       * Checks if the element is contained within the viewport.
       * Top and bottom of element must be within viewport.
       * @example cy.getByDataCy('some-id').isContainedInViewport()
       */
      isContainedInViewport(): Chainable<any>

      /**
       * Navigates to desired url, if not currently there
       * @param desiredUrl string value
       * @example
       * // this command
       * cy.navToUrl('http://localhost:3000/')
       * // will navigate to the url, if not currently there
       */
      navToUrl(input: string): void

      /**
       * Sets authentication token cookie for authenticating on invest site
       * @example
       * // this command
       * cy.setAuthCookie()
       * // will set auth cookie and simulate a log in.
       */
      setAuthCookie(email: string, password: string): void

      /**
       * Gets a chainable HTML Input element from a Strip iframe
       * @example
       * cy.getStripeElement('input_name')
       */
      getStripeElement(fieldName: string): Chainable<HTMLInputElement>

      /**
       * Deprecated: use `cancelInvestments` from utils instead
       * @example
       * cy.cancelInvestment()
       */
      cancelInvestment(): void

      /**
       * Gets a auto-generated test user
       * @example
       * cy.getNewTestUser().then((user) => user.email)
       */
      getNewTestUser(): Chainable<User>

      /**
       * Deletes a test user with the given email
       * @example
       * cy.deleteTestUser('test@example.com')
       */
      deleteTestUser(email: string): void
    }
  }
}
