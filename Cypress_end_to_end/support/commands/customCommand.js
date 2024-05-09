import 'cypress-iframe'

Cypress.Commands.add(
  'getStripeElement',
  { prevSubject: true },
  (subject, fieldName) => {
    if (Cypress.config('chromeWebSecurity')) {
      throw new Error(
        'To get stripe element `chromeWebSecurity` must be disabled'
      )
    }

    return cy
      .wrap(subject)
      .find('iframe')
      .its('0.contentDocument')
      .its('body')
      .find(`input[data-elements-stable-field-name="${fieldName}"]`)
  }
)

Cypress.Commands.add('getByTestId', (testid) => {
  return cy.get(`[data-testid=${testid}]`)
})

Cypress.Commands.add('fillInfo', () => {
  cy.intercept(
    'PUT',
    'https://thin-mint.stg.angelstudios.com/api/parties/*'
  ).as('infoPage')
  return cy
    .get('span')
    .contains('Continue')
    .should('be.visible')
    .click({ timeout: 12000 })
    .then(() => {
      return cy.wait('@infoPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})

Cypress.Commands.add('fillInfoNew', () => {
  const ssn_val = Math.floor(1000000000 + Math.random() * 900000000)

  cy.intercept(
    'GET',
    'https://thin-mint.stg.angelstudios.com/api/investments/'
  ).as('infoPage')
  return cy
    .get('#party\\.firstName')
    .click()
    .clear()
    .type('New-user')
    .then(() => {
      // return cy.get('[data-testId=firtsName').click().clear().type('New-user').then(()=>{
      return cy.get('#party\\.lastName').click().clear().type('test')
    })
    .then(() => {
      return cy.get('#party\\.phoneNumber').click().clear().type('5123893339')
    })
    .then(() => {
      return cy.get('#party\\.birthday').click().clear().type('01012000')
    })
    .then(() => {
      return cy
        .get('#party\\.address1')
        .click()
        .clear()
        .type('Auto address -- 3600 Presidential Blvd ')
    })
    .then(() => {
      return cy
        .get('#party\\.address2')
        .click()
        .clear()
        .type('Auto address --Central Texas hub with Live music')
    })
    .then(() => {
      return cy.get('#party\\.city').click().clear().type('Austin')
    })
    .then(() => {
      return cy.get('select#party\\.state').select('TX')
    })
    .then(() => {
      return cy.get('#party\\.postalCode').click().clear().type('78719')
    })
    .then(() => {
      return cy.get('#party\\.ssn').click().type(ssn_val)
    })
    .then(() => {
      return cy
        .get('span')
        .contains('Continue')
        .should('be.visible')
        .click({ timeout: 10000 })
    })
    .then(() => {
      return cy.wait('@infoPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})
Cypress.Commands.add('fillInfo_entity', () => {
  cy.intercept(
    'PUT',
    'https://thin-mint.stg.angelstudios.com/api/parties/*'
  ).as('infoPage')
  return cy
    .get('[data-testid="isEntity"]')
    .contains('NO')
    .click({ force: true })
    .should('contain', 'YES')

    .then(() => {
      return cy.get('button').contains('Select One').click()
    })
    .then(() => {
      return cy.get('[data-value=Corporation]').click()
    })
    .then(() => {
      return cy.get('[name=entity\\.name]').type('Corp-name')
    })
    .then(() => {
      return cy.get('#entity\\.email').type('auto-email-corp@autotest.com')
    })
    .then(() => {
      return cy.get('#entity\\.phoneNumber').click().clear().type('5125119856')
    })
    .then(() => {
      return cy.get('#entity\\.address1').click().type('address 1')
    })
    .then(() => {
      return cy.get('#entity\\.city').click().clear().type('Boston')
    })
    .then(() => {
      return cy.get('#entity\\.state').select('TX')
    })
    .then(() => {
      return cy.get('#entity\\.postalCode').click().type('41231')
    })
    .then(() => {
      return cy
        .get('span')
        .contains('Add documents and EIN')
        .click({ timeout: 35000 })
    })
    .then(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('ResizeObserver loop')
        return false
      })
    })
    .then(() => {
      return cy.get('#entity\\.ein').click().clear().type('512441234')
    })
    .then(() => {
      return cy.get('button').contains('Browse files').click()
    })
    .then(() => {
      // uploading file locally
      // return cy.get('input[type=file]').selectFile('/Users/sameenakauser-mbp/Downloads/big_bend_texas_landscape.jpg',{force:true},{timeout:25000})
      // uploading from a fixture
      return cy.fixture('big_bend_texas_landscape.jpg').as('myFixture')

      // return cy.get('input[type=file]').selectFile('@myFixture',{force:true},{timeout:25000})
    })
    .then(() => {
      cy.wait(2000)
      return cy
        .get('input[type=file]')
        .selectFile('@myFixture', { force: true }, { timeout: 25000 })
    })
    .then(() => {
      cy.wait(4000)
      return cy.get('span').contains('Continue').should('be.visible').click()
    })
    .then(() => {
      return cy.wait('@infoPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})
Cypress.Commands.add('fillInfo_NewEntity', () => {
  const ssn_val = Math.floor(1000000000 + Math.random() * 900000000)
  Cypress.on('uncaught:exception', () => {
    return false
  })

  cy.intercept(
    'GET',
    'https://thin-mint.stg.angelstudios.com/api/investments/'
  ).as('infoPage')
  return cy
    .get('#party\\.firstName')
    .click()
    .clear()
    .type('New-user')
    .then(() => {
      // return cy.get('[data-testId=firtsName').click().clear().type('New-user').then(()=>{
      return cy.get('#party\\.lastName').click().clear().type('test')
    })
    .then(() => {
      return cy.get('#party\\.phoneNumber').click().clear().type('5123893339')
    })
    .then(() => {
      return cy.get('#party\\.birthday').click().clear().type('01012000')
    })
    .then(() => {
      return cy
        .get('#party\\.address1')
        .click()
        .clear()
        .type('Auto address -- 3600 Presidential Blvd ')
    })
    .then(() => {
      return cy
        .get('#party\\.address2')
        .click()
        .clear()
        .type('Auto address --Central Texas hub with Live music')
    })
    .then(() => {
      return cy.get('#party\\.city').click().clear().type('Austin')
    })
    .then(() => {
      return cy.get('select#party\\.state').select('TX')
    })
    .then(() => {
      return cy.get('#party\\.postalCode').click().clear().type('78719')
    })
    .then(() => {
      return cy.get('#party\\.ssn').click().type(ssn_val)
    })
    .then(() => {
      cy.intercept(
        'PUT',
        'https://thin-mint.stg.angelstudios.com/api/parties/*'
      ).as('infoPage')
      return cy
        .get('[data-testid="meta\\.isEntity"]')
        .contains('NO')
        .click({ force: true })
        .should('contain', 'YES')

        .then(() => {
          return cy.get('button').contains('Select One').click()
        })
        .then(() => {
          return cy.get('[data-value=Corporation]').click()
        })
        .then(() => {
          return cy.get('[name=entity\\.name]').type('Corp-name')
        })
        .then(() => {
          return cy.get('#entity\\.email').type('auto-email-corp@autotest.com')
        })
        .then(() => {
          return cy
            .get('#entity\\.phoneNumber')
            .click()
            .clear()
            .type('5125119856')
        })
        .then(() => {
          return cy.get('#entity\\.address1').click().type('address 1')
        })
        .then(() => {
          return cy.get('#entity\\.city').click().clear().type('Boston')
        })
        .then(() => {
          return cy.get('#entity\\.state').select('TX')
        })
        .then(() => {
          return cy.get('#entity\\.postalCode').click().type('41231')
        })
        .then(() => {
          return cy
            .get('span')
            .contains('Add documents and EIN')
            .click({ timeout: 35000 })
        })
        .then(() => {
          cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('ResizeObserver loop')
            return false
          })
        })
        .then(() => {
          return cy.get('#entity\\.ein').click().clear().type('512441234')
        })
        .then(() => {
          return cy.get('button').contains('Browse files').click()
        })
        .then(() => {
          // uploading file locally
          // return cy.get('input[type=file]').selectFile('/Users/sameenakauser-mbp/Downloads/big_bend_texas_landscape.jpg',{force:true},{timeout:25000})
          // uploading from a fixture
          return cy.fixture('big_bend_texas_landscape.jpg').as('myFixture')

          // return cy.get('input[type=file]').selectFile('@myFixture',{force:true},{timeout:25000})
        })
        .then(() => {
          cy.wait(2000)
          return cy
            .get('input[type=file]')
            .selectFile('@myFixture', { force: true }, { timeout: 25000 })
        })
        .then(() => {
          cy.wait(4000)
          return cy
            .get('span')
            .contains('Continue')
            .should('be.visible')
            .click()
        })
        .then(() => {
          return cy.wait('@infoPage').then((xhr) => {
            cy.log(xhr.response.statusCode)
            expect(xhr.response.statusCode).to.eql(200)
          })
        })
    })
})

Cypress.Commands.add('fillAmountNew', () => {
  return cy
    .get('#investment\\.amount')
    .click()
    .clear()
    .type('100')
    .then(() => {
      return cy
        .intercept(
          'PUT',
          'https://thin-mint.stg.angelstudios.com/api/investments/*'
        )
        .as('amountPage')
    })
    .then(() => {
      return cy
        .contains('Continue')
        .should('be.visible')
        .click({ force: true }, { timeout: 25000 })
    })
    .then(() => {
      return cy.wait('@amountPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})

Cypress.Commands.add('fillAmount', () => {
  return cy
    .get('#investment\\.amount')
    .click()
    .clear()
    .type('100')
    .then(() => {
      return cy
        .intercept(
          'GET',
          'https://thin-mint.stg.angelstudios.com/api/investments/'
        )
        .as('amountPage')
    })
    .then(() => {
      return cy
        .contains('Continue')
        .should('be.visible')
        .click({ force: true }, { timeout: 25000 })
      // return cy.get('span').contains('Continue').click({timeout:25000})
    })
    .then(() => {
      return cy.wait('@amountPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})

Cypress.Commands.add('fillAmount_entity', () => {
  return cy
    .get('#investment\\.amount')
    .click()
    .clear()
    .type('3500')
    .then(() => {
      return cy.get('#party\\.yearlyIncome').click().clear().type('200000')
    })
    .then(() => {
      return cy
        .intercept(
          'GET',
          'https://thin-mint.stg.angelstudios.com/api/investments/'
          // 'PUT',
          // 'https://thin-mint.stg.angelstudios.com/api/parties/*'
        )
        .as('amountPage')
    })
    .then(() => {
      return cy
        .contains('Continue')
        .should('be.visible')
        .click({ force: true }, { timeout: 25000 })
    })
    .then(() => {
      return cy.wait('@amountPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})

Cypress.Commands.add('fillAmount_entity_new', () => {
  return cy
    .get('#investment\\.amount')
    .click()
    .clear()
    .type('3500')
    .then(() => {
      return cy.get('#party\\.yearlyIncome').click().clear().type('200000')
    })
    .then(() => {
      return cy
        .intercept(
          'PUT',
          'https://thin-mint.stg.angelstudios.com/api/investments/*'
        )
        .as('amountPage')
    })
    .then(() => {
      return cy
        .contains('Continue')
        .should('be.visible')
        .click({ force: true }, { timeout: 25000 })
    })
    .then(() => {
      return cy.wait('@amountPage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(200)
      })
    })
})

Cypress.Commands.add('fillTerms', () => {
  return cy
    .get('[id$=signature', { timeout: 20000 })
    .type('test1')
    .then(() => {
      // Check all radio buttons
      return cy.checkAllRadioButtons()
    })
    .then(() => {
      return cy.get('span').contains('Continue').click()
    })
    .then(() => {
      cy.log('end of fill-Terms function')
    })
})
Cypress.Commands.add('fillCC', () => {
  cy.log('reached fillCC function')
  cy.contains('Credit card')
    .click()
    .then(() => cy.wait(10000))
    // .then(() => {
    //   cy.iframe('[title="iframe"]').click()
    //   cy.frameLoaded('[title="iframe"]')
    // })

    //   .then(() => {
    //     cy.enter('[title="iframe"]').then((frameBody)=>{
    //     frameBody().find("#cardName").click().type("Abc")

    //     })
    //     .then(()=>{
    //       cy.getStripeElement('cardNumber').click().type("4111111111111111")
    //     })
    //   })
    //   .then(() => {
    //       cy.getStripeElement('cardExpiry').click().type("1029")
    //     })
    //   .then(() => {
    //     cy.getStripeElement('cardCvc').click().type("455")
    //     })
    //   .then(() => {
    //     cy.getStripeElement('postalCode').click().type("42312")
    //     })
    //   .then(() => {
    //     cy.enter('[title="iframe"]').then((frameBody)=>{
    //       frameBody().find("#submit").click()
    //     })
    // })
    .then(() => {
      return cy
        .intercept(
          'POST',
          'https://thin-mint.stg.angelstudios.com/api/payments/'
        )
        .as('confirmpage')
    })
    .then(() => {
      return cy
        .intercept('GET', 'https://thin-mint.stg.angelstudios.com/api/parties/')
        .as('confirminvested')
    })
    .then(() => {
      cy.get('button[type="button"]').contains('Submit Payment').click()
    })
    .then(() => {
      return cy.wait('@confirmpage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(201)
      })
    })
})
Cypress.Commands.add('fillCCNew', () => {
  cy.log('reached fillCC function')
  cy.contains('Credit card')
    .click()
    .then(() => cy.wait(10000))
    .then(() => {
      cy.iframe('[title="iframe"]').click()
      cy.frameLoaded('[title="iframe"]')
    })

    .then(() => {
      cy.enter('[title="iframe"]')
        .then((frameBody) => {
          frameBody().find('#cardName').click().type('Abc')
        })
        .then(() => {
          cy.getStripeElement('cardNumber').click().type('4111111111111111')
        })
    })
    .then(() => {
      cy.getStripeElement('cardExpiry').click().type('1029')
    })
    .then(() => {
      cy.getStripeElement('cardCvc').click().type('455')
    })
    .then(() => {
      cy.getStripeElement('postalCode').click().type('42312')
    })
    .then(() => {
      cy.enter('[title="iframe"]').then((frameBody) => {
        frameBody().find('#submit').click()
      })
    })
    .then(() => {
      return cy
        .intercept(
          'POST',
          'https://thin-mint.stg.angelstudios.com/api/payments/'
        )
        .as('confirmpage')
    })
    .then(() => {
      return cy
        .intercept('GET', 'https://thin-mint.stg.angelstudios.com/api/parties/')
        .as('confirminvested')
    })
    .then(() => {
      cy.get('button[type="button"]').contains('Submit Payment').click()
    })
    .then(() => {
      return cy.wait('@confirmpage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(201)
      })
    })
})
Cypress.Commands.add('fillEcheck', () => {
  return cy
    .contains('E-Check')
    .click()
    .then(() => {
      cy.contains('Checking').click()
    })
    .then(() => {
      cy.get('[id$="routingNumber').type('091000019')
    })
    .then(() => {
      cy.get('[id$="accountNumber').type('1234567890123')
    })
    .then(() => {
      cy.contains('Continue').click()
    })
    .then(() => {
      return cy
        .intercept(
          'POST',
          'https://thin-mint.stg.angelstudios.com/api/payments/'
        )
        .as('confirmpage')
    })

    .then(() => {
      return cy.get('button[type="button"]').contains('Submit Payment').click()
    })
    .then(() => {
      return cy.wait('@confirmpage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(201)
      })
    })
})

Cypress.Commands.add('fillBank', () => {
  return cy
    .contains('Bank')
    .click()
    .then(() => {
      cy.frameLoaded('#plaid-link-iframe-1')
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
    })
    .then(() => {
      // label nested y=under li
      cy.iframe('#plaid-link-iframe-1')
        .find('[aria-label="Citizens Bank"]')
        .click()
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1')
        // .contains('User ID')
        .find('input#aut-input-0')
        .click()
        .type('user_good')
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1')
        .find('input#aut-input-1')
        .click()
        .type('pass_good')
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1').contains('Submit').click()
    })
    .then(() => {
      // New Plaid update has taken away this step
      return cy
        .iframe('#plaid-link-iframe-1')
        .contains('Plaid Checking')
        .prev('input')
        .check({ force: true })
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
    })
    .then(() => {
      cy.iframe('#plaid-link-iframe-1').contains('Continue').click()
    })
    .then(() => {
      return cy
        .intercept(
          'POST',
          'https://thin-mint.stg.angelstudios.com/api/payments/'
        )
        .as('confirmpage')
    })

    .then(() => {
      return cy.get('button[type="button"]').contains('Submit Payment').click()
    })
    .then(() => {
      return cy.wait('@confirmpage').then((xhr) => {
        cy.log(xhr.response.statusCode)
        expect(xhr.response.statusCode).to.eql(201)
      })
    })
})

Cypress.Commands.add('checkAllRadioButtons', () => {
  const buttons = [
    "[data-testid='investment.agreeInvestorEducation']",
    "[data-testid='investment.agreeResold']",
    "[data-testid='investment.agreeKnowledgeable']",
    "[data-testid='investment.agreeInvestmentLimit']",
    "[data-testid='investment.agreeSignature']",
  ]
  Cypress.Promise.map(buttons, (button) => {
    return cy.get(button).then((el) => {
      if (el.text().toLowerCase() === 'no') {
        el.trigger('click')
      }
    })
  })
})
Cypress.Commands.add('cancelInvestment', () => {
  // cy.get('a[href*="tuttle-twins-2"]', { timeout:20000 }).first().click()

  return cy
    .get("button[aria-label='User Menu']", { timeout: 5000 })
    .click()
    .then(() => {
      return cy
        .get('span', { timeout: 7000 })
        .contains('My Investments')
        .should('be.visible')
        .click()
    })
    .then(() => {
      cy.wait(12000)
      cy.get('a', { timeout: 18000 })
        .contains('Tuttle Twins')
        .first()
        .click({ timeout: 25000 })
    })
    .then(() => {
      cy.wait(18000)
      return cy
        .contains('Cancel This Investment', { timeout: 35000 }, { force: true })
        .click()
    })
    .then(() => {
      return cy
        .intercept(
          'GET',
          'https://thin-mint.stg.angelstudios.com/api/investments/'
        )
        .as('confirmCancel')
    })
    .then(() => {
      return cy
        .get('button')
        .contains('Cancel Investment')
        .click({ timeout: 7000 })
    })
    .then(() => {
      cy.wait(12000)
      return cy.wait('@confirmCancel').then((xhr) => {
        expect(xhr.response.statusCode).to.eql(200)
        cy.on('fail', (err, runnable) => {
          // eslint-disable-next-line
          console.log(err.message)
          return false
        })
      })
    })
})
