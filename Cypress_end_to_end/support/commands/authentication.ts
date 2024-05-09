import {
  ANGEL_AUTH_TOKEN,
  ANGEL_USERID,
} from '../../../src/components/context/AuthContext/utils'
import { User } from '../../../src/services/api/user'

Cypress.Commands.add('setAuthCookie', (email, password) => {
  const authUrl = Cypress.env('authUrl')

  Cypress.log({
    consoleProps() {
      return {
        url: authUrl,
        username: email,
      }
    },
    displayName: 'setAuthCookie',
    name: 'Set auth cookie to simulate a log in.',
  })

  cy.request({
    method: 'POST',
    url: authUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      password,
      username: email,
      source: 'invest',
    },
  }).then((response) => {
    cy.setCookie(ANGEL_AUTH_TOKEN, response.body.authorization)
    cy.setCookie(ANGEL_USERID, response.body.uuid)
  })
})

Cypress.Commands.add('getNewTestUser', () => {
  const url = `${Cypress.env('thinMintApiUrl')}/testenv/user/`

  Cypress.log({
    displayName: 'getNewTestUser',
    name: 'Get new user',
  })

  return cy
    .request({
      method: 'POST',
      url: url,
      headers: {
        Authorization: Cypress.env('thinMintApiKey'),
      },
    })
    .then((res: { body: User }) => res.body)
})

Cypress.Commands.add('deleteTestUser', (email: string) => {
  const url = `${Cypress.env(
    'thinMintApiUrl'
  )}/testenv/user/${encodeURIComponent(email)}/`

  Cypress.log({
    displayName: 'deleteTestUser',
    name: `Delete test user ${email}`,
  })

  return cy.request({
    method: 'DELETE',
    url: url,
    headers: {
      Authorization: Cypress.env('thinMintApiKey'),
    },
  })
})
