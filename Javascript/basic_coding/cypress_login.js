/*
Write a simple script in JavaScript using Cypress to automate the login process for a web application. Assume the login page has fields for username and password and a submit button.
Follow-up: How would you handle dynamic elements, such as CAPTCHA, that might appear on the login page?
*/

describe("Login test in ypress",()=>{
    it("Login test",()=>{
        cy.visit('url')
        cy.get('button').contains('Login').click()
        cy.get('#username').click().type('a@b.c')
        cy.get('#passwd').click().type('Abc123')
        cy.get('button').contains('submit').click()

        cy.url().should('contain','/abcd')

    })
})

describe("Login test in cypress",()=>{
    it("Login test",()=>{
        cy.visit('url')
        cy.get('.button-class').contains('Login').click()
        cy.get('#usrname').click().type('1234')
        cy.get('[input=name').click().type('fafaf')
        cy.get('button').contains('submit').click()
        cy.url().should('contain','/abcd')
    })
})

/*
To handle captcha , ask the dev team to disable captcha for test environment
Ask the devs to put the test account in the whitelist for testing 
of test the apis for login without enabling UI 

it('test the apis ,()=>{
    cy.request('POST' , 'http://gmail.com',{
        username: 'sreume@gmail.com'
        passwd: 's3qwe'
    })
    .then((response)=>{
        expect(response.status('eq',200))

        cy.setcookie('session_id',response.body.seesionId)

        // visit login page
        cy.visit('httlps://gmail.com/login/'$userid')

        //validate it has entered the page 
        cy.get('.hompage').should('contain', homepage)
    })
})
*/