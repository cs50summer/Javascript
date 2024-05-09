// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
import got from 'got'
import { pick, map } from 'lodash'
import { Campaign } from '../../src/services/api/campaign'

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // when we load the plugins file, let's fetch the data
  const projects: Campaign[] = await got(
    'https://thin-mint.stg.angelstudios.com/api/campaign/'
  ).json()

  // we are only interested in the username and ID fields
  const projectInfo = map(projects, (project) =>
    pick(project, [
      'name',
      'slug',
      'capital_raised',
      'capital_goal',
      'investors_total',
      'regulation_type',
      'capital_pledged',
      'currently_funding',
      'perks',
      'preview_img',
      'type',
      'offering_model',
      'users_pledged',
      'prior_raises',
    ])
  )
  let storeVariable = ''

  on('task', {
    setVar1(val: string) {
      return (storeVariable = val)
    },
    getVar1() {
      return storeVariable
    },
  })

  config.env.userDefaultPassword = process.env.CYPRESS_USER_DEFAULT_PASSWORD
  config.env.authUrl = process.env.CYPRESS_AUTH_URL
  config.env.thinMintApiUrl = process.env.CYPRESS_THIN_MINT_API_URL
  config.env.thinMintApiKey = process.env.CYPRESS_THIN_MINT_API_KEY
  config.env.projects = projectInfo

  return config
}
