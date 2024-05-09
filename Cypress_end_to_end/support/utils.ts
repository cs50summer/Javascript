import { SelectorMatcherOptions } from '@testing-library/cypress'
import 'cypress-iframe'
type Field = {
  label: string
  value: string
  name: string
  type?: 'text' | 'select' | 'file' | 'radio'
  options?: SelectorMatcherOptions
}

export const fillForm = (fields: Field[]) => {
  fields.forEach(({ label, name, value, type = 'text', options }) => {
    if (name) {
      cy.get(`[name=${name}]`).as('input')
    } else {
      cy.findByLabelText(label, options).as('input')
    }
    if (type === 'text') cy.get('@input').clear().type(value)
    if (type === 'select') cy.get('@input').select(value)
    if (type === 'radio') cy.findByText(value).click()
    if (type === 'file') {
      cy.fixture(value).as('myFixture')
      cy.get('@input').selectFile('@myFixture', {
        force: true,
        timeout: 25000,
      })
    }
  })
}

export const partyFields = [
  { label: 'First Name', value: 'New-user' },
  { label: 'Last Name', value: 'test' },
  { label: 'Phone Number', value: '5123893339' },
  { label: 'Date of Birth', value: '01012000' },
  { label: 'Address 1', value: 'Auto address -- 3600 Presidential Blvd' },
  {
    label: 'Address 2 (optional)',
    value: 'Auto address --Central Texas hub with Live music',
  },
  { label: 'City', value: 'Austin' },
  { label: 'State', value: 'Texas', type: 'select' },
  { label: 'Postal Code', value: '78719' },
  {
    label: 'Social Security Number',
    value: `${Math.floor(1000000000 + Math.random() * 900000000)}`,
    options: { exact: false },
  },
] as Field[]

export const achFields = [
  { label: 'Account Type', value: 'Checking', type: 'radio' },
  { label: 'Routing Number', value: '091000019' },
  { label: 'Account Number', value: '1234567890123' },
] as Field[]

export const entityFields = [
  { label: 'Entity Type', value: 'Corporation', type: 'select' },
  { label: 'Entity Name', value: 'Test-Spring-corp' },
  { label: 'Email', value: 'spring-corp@company.com' },
  { label: 'Phone Number', value: '5123893339' },
  { label: 'Business Address 1', value: 'Spring Valley' },
  { label: 'Business Address 2 (optional)', value: 'Water street' },
  { label: 'City', value: 'Harbordale' },
  { label: 'State/Province', value: 'Texas', type: 'select' },
  { label: 'Postal Code', value: '78719' },
  { label: 'EIN', value: '787971009' },
  {
    name: 'documents',
    type: 'file',
    value: '22_23 Registration Flyer.pdf',
  },
] as Field[]

export const ivaFields = [
  {
    label: 'Social Security Number',
    value: `${Math.floor(1000000000 + Math.random() * 900000000)}`,
    options: { exact: false },
  },
  { label: 'First Name', value: 'Auto-iva' },
  { label: 'Middle Initial', value: 'n' },
  { label: 'Last Name', value: 'test' },
  { label: 'Date of Birth', value: '01012000' },
  { label: 'Address 1', value: 'Auto address -- 3600 Presidential Blvd' },
  {
    label: 'Address 2 (optional)',
    value: 'Auto address --Central Texas hub with Live music',
  },
  { label: 'City', value: 'Austin' },
  { label: 'State', value: 'Texas', type: 'select' },
  { label: 'Postal Code', value: '78719' },
] as Field[]

export const agreements = [
  'agreeInvestorEducation',
  'agreeResold',
  'agreeKnowledgeable',
  'agreeInvestmentLimit',
  'agreeSignature',
]

const fillCreditCardForm = () => {
  cy.findByText('Credit card')
    .closest('button', { timeout: 30000 })
    .as('paymentButton')
    .should('not.be.disabled')

  cy.get('@paymentButton').click()

  cy.get('[title="iframe"]')
    .its('0.contentDocument')
    .its('body')
    .as('stripeIframe')

  cy.get('@stripeIframe').find('#cardName').type('Abc')

  cy.get('@stripeIframe')
    .getStripeElement('cardNumber')
    .type('4111111111111111')
  cy.get('@stripeIframe').getStripeElement('cardExpiry').type('0129')
  cy.get('@stripeIframe').getStripeElement('cardCvc').type('123')
  cy.get('@stripeIframe').getStripeElement('postalCode').type('12345')

  cy.get('@stripeIframe').findByText('Submit').click()

  cy.findByText('Visa ending in 1111', { timeout: 30000 }).should('exist')
  cy.findByRole('dialog').should('not.exist')
}

const fillCreditCardFormOld = () => {
  cy.findByText('Credit card')
    .closest('button', { timeout: 30000 })
    .as('paymentButton')
    .should('not.be.disabled')
  cy.get('@paymentButton').click({ timeout: 30000 })
  cy.get('button').contains('Edit Card').should('exist')
}

const fillCreditCardFormFailed = () => {
  cy.findByText('Credit card')
    .closest('button', { timeout: 30000 })
    .as('paymentButton')
    .should('not.be.disabled')

  cy.get('@paymentButton').click()

  cy.findByText('Edit Card')
    .closest('button', { timeout: 30000 })
    .as('editButton')
    .should('not.be.disabled')
  cy.get('@editButton').click()

  cy.findByText('Update Card')
    .closest('button', { timeout: 30000 })
    .as('updateButton')
    .should('not.be.disabled')
  cy.get('@updateButton').click()

  cy.get('[title="iframe"]')
    .its('0.contentDocument')
    .its('body')
    .as('stripeIframe')

  cy.get('@stripeIframe').find('#cardName').type('Test CC Failed')

  cy.get('@stripeIframe')
    .getStripeElement('cardNumber')
    .type('4111111111111111')
  cy.get('@stripeIframe').getStripeElement('cardExpiry').type('0129')
  cy.get('@stripeIframe').getStripeElement('cardCvc').type('123')
  cy.get('@stripeIframe').getStripeElement('postalCode').type('12345')

  cy.get('@stripeIframe').findByText('Submit').click()

  cy.findByText('Visa ending in 1111', { timeout: 30000 }).should('exist')
  cy.findByRole('dialog').should('not.exist')
}

const fillACHForm = () => {
  cy.findByText('E-Check')
    .closest('button')
    .as('paymentButton')
    .should('not.be.disabled')

  cy.get('@paymentButton').click()

  fillForm(achFields)
  cy.findByRole('dialog').findByText('Continue').click()
  cy.findByRole('dialog').should('not.exist')
}
const fillBankForm = () => {
  cy.findByText('Bank account')
    .closest('button', { timeout: 30000 })
    .as('paymentButton')
    .should('not.be.disabled')
  cy.wait(4000)
  cy.get('@paymentButton').click()
  // There are still some timing issues in Iframe load and detection , but seems to be fixed with increased wait window
  cy.wait(8000)

  cy.frameLoaded('#plaid-link-iframe-1', { timeout: 10000 }).should(
    'be.visible'
  )
  cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
  cy.iframe('#plaid-link-iframe-1').find('[aria-label="Citizens Bank"]').click()
  cy.iframe('#plaid-link-iframe-1')
    .find('input#aut-input-0')
    .click()
    .type('user_good')
  cy.iframe('#plaid-link-iframe-1')
    .find('input#aut-input-1')
    .click()
    .type('pass_good')
  cy.iframe('#plaid-link-iframe-1').contains('Submit').click()
  cy.iframe('#plaid-link-iframe-1')
    .contains('Plaid Checking')
    .prev('input')
    .check({ force: true })
  cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
  cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
}

export const recurseInvestmentSteps = (
  step: string,
  paymentMethod:
    | 'credit'
    | 'ach'
    | 'credit_old'
    | 'credit_fail'
    | 'bank' = 'ach'
) => {
  if (step === 'info_new' || step === 'info_new_entity') {
    cy.findByText('Investor Profile').should('exist')
    fillForm(partyFields)
    cy.findByText('Continue').click()
    if (step === 'info_new') {
      recurseInvestmentSteps('amount', paymentMethod)
    } else {
      cy.get('#step-container-info').as('stepLabel').should('exist')
      // Since the Investor Profile is already created , the steps can recurse from entity creation section .
      // Select the entity toggle button
      cy.get('[data-testid="meta\\.isEntity"]')
        .contains('NO')
        .click({ force: true })
        .should('contain', 'YES')
      cy.get('button').contains('Create Entity').click()
      recurseInvestmentSteps('entity', paymentMethod)
    }
  }

  if (step === 'info_accredited') {
    cy.findByText('Investor Profile').should('exist')
    fillForm(partyFields)
    cy.get('[data-testid="accredited"]')
      .contains('NO')
      .click({ force: true })
      .should('contain', 'YES')
    cy.findByText('Continue').click()
    cy.wait(5000)
    cy.get('#step-container-amount').as('stepLabel').should('exist')
    recurseInvestmentSteps('amount_accredited', paymentMethod)
  }

  if (step === 'entity') {
    fillForm(entityFields)
    cy.findByRole('dialog').findByText('Submit').click()
    cy.wait(5000)
    cy.get('#step-container-amount').as('stepLabel').should('exist')
    recurseInvestmentSteps('amount_entity', paymentMethod)
  }

  if (step === 'amount') {
    fillForm([{ label: 'Amount to invest (USD)', value: '100' }])

    // Adding a wait for possible race condition where form is submitted
    // before amount is set in formValues
    cy.wait(500)
    recurseInvestmentSteps('terms', paymentMethod)
  }

  if (step === 'amount_entity') {
    fillForm([
      { label: 'Amount to invest (USD)', value: '3500' },
      { label: 'Yearly Income', value: '250000' },
    ])

    // Adding a wait for possible race condition where form is submitted
    // before amount is set in formValues
    cy.wait(500)
    recurseInvestmentSteps('terms', paymentMethod)
  }

  if (step === 'amount_accredited') {
    fillForm([{ label: 'Amount to invest (USD)', value: '6500' }])

    cy.wait(500)
    recurseInvestmentSteps('terms', paymentMethod)
  }

  if (step === 'terms') {
    fillForm([{ label: 'Type name to sign', value: 'Hello World' }])
    agreements.forEach((agreement) => {
      cy.findByTestId(`investment.${agreement}`).click()
    })

    recurseInvestmentSteps('payment', paymentMethod)
  }

  if (step === 'payment') {
    if (paymentMethod === 'credit') fillCreditCardForm()
    if (paymentMethod === 'credit_fail') fillCreditCardFormFailed()
    if (paymentMethod === 'credit_old') fillCreditCardFormOld()
    if (paymentMethod === 'ach') fillACHForm()
    if (paymentMethod === 'bank') fillBankForm()
    cy.findByText('Submit').click()
  }
}

export const cancelInvestment = (campaignName = 'Tuttle Twins') => {
  cy.visit('/investments')

  cy.findByText(`${partyFields[0].value} ${partyFields[1].value}`, {
    timeout: 30000,
  }).should('exist')

  cy.findAllByText(campaignName).first().click({ force: true })

  cy.findByText('Cancel This Investment', { timeout: 30000 }).should('exist')

  cy.findByText('Cancel This Investment', { timeout: 30000 }).click({
    force: true,
  })

  // confirm in modal
  cy.findByRole('dialog')
    .findByText('Cancel Investment', { timeout: 30000 })
    .click()
  cy.findByRole('dialog').should('not.exist')
  cy.findByText('Cancelled', { timeout: 45000 }).should('exist')
}

export const pledgeForm = (type: string) => {
  cy.get('button').contains('$500').click()
  cy.findByLabelText('Phone Number').click().clear().type('712-708-9122')
  cy.findByLabelText('First Name').click().clear().type('Pledge')
  cy.findByLabelText('Last Name').click().clear().type('testAuto')
  cy.findByLabelText('Country').get('[data-value="US"]').click()
  cy.findByText('State').should('exist')
  if (type === 'new') {
    cy.findByLabelText('State').click()
  }
  cy.findByLabelText('State').get('[data-value="AK"]').click()
  cy.findByText('Submit').click()
}

export const ivaFlow = (campaignName = 'Tuttle Twins') => {
  cy.visit('/investments')
  cy.findByText(`${partyFields[0].value} ${partyFields[1].value}`, {
    timeout: 30000,
  }).should('exist')
  cy.findAllByText(campaignName).first().click({ force: true })
  // cy.findByText('Verify', { timeout: 30000 }).should('exist')
  cy.get('button').contains('Verify', { timeout: 30000 }).should('exist')
  cy.get('button').contains('Verify').click({ force: true })
  fillForm(ivaFields)
  cy.findByText('Submit').click()
  cy.findAllByText('Verified', { timeout: 45000 }).first().should('exist')
}
export const paymentUpdateFlow = (campaignName = 'Tuttle Twins') => {
  cy.visit('/investments')
  cy.findAllByText(campaignName).first().click({ force: true })
  cy.get('button')
    .contains('Update payment', { timeout: 30000 })
    .should('exist')
  cy.get('button').contains('Update payment').click({ force: true })
  fillACHForm()
  cy.findByText('Submit').click()
  // Add a validation step when the paid step is updated .
}
