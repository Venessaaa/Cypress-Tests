import { generateFakeUser } from '../../utils/ParabankUtils';
import { fillRegistrationForm } from '../../utils/ParabankUtils';
import { getRandomStateWithZip } from '../../utils/ParabankUtils';

import '../../support/Commands/command';

describe('Parabank Registration', () => {
    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        // cy.clearCookies();
        // cy.clearAllCookies();
        // cy.clearLocalStorage();
        // cy.window().then((win) => win.sessionStorage.clear());

    });

    it('Should register user', () => {
        const user = generateFakeUser()
        cy.get('input[name="customer.firstName"]').type(user.firstName).wait(200);
        cy.get('input[name="customer.lastName"]').type(user.lastName).wait(200);
        cy.get('input[name="customer.address.street"]').type(user.address).wait(200);
        cy.get('input[name="customer.address.city"]').type(user.city).wait(200);
        cy.get('input[name="customer.address.state"]').type(user.state).wait(200);
        cy.get('input[name="customer.address.zipCode"]').type(user.zipCode).wait(200);
        cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber).wait(200);
        cy.get('input[name="customer.ssn"]').type(user.ssn).wait(200);
        cy.get('input[name="customer.username"]').type(user.username).wait(200);
        cy.get('input[name="customer.password"]').type(user.password).wait(200);
        cy.get('input[name="repeatedPassword"]').type(user.password).wait(200);
        cy.get('input[value="Register"]').click().wait(200);
        cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
        // cy.captureScreenshot();

    })
    it('Should let the user open new account', () => {
        const user = generateFakeUser()
        cy.get('input[name="customer.firstName"]').type(user.firstName).wait(200);
        cy.get('input[name="customer.lastName"]').type(user.lastName).wait(200);
        cy.get('input[name="customer.address.street"]').type(user.address).wait(200);
        cy.get('input[name="customer.address.city"]').type(user.city).wait(200);
        cy.get('input[name="customer.address.state"]').type(user.state).wait(200);
        cy.get('input[name="customer.address.zipCode"]').type(user.zipCode).wait(200);
        cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber).wait(200);
        cy.get('input[name="customer.ssn"]').type(user.ssn).wait(200);
        cy.get('input[name="customer.username"]').type(user.username).wait(200);
        cy.get('input[name="customer.password"]').type(user.password).wait(200);
        cy.get('input[name="repeatedPassword"]').type(user.password).wait(200);
        cy.get('input[value="Register"]').click().wait(200);
        cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
        // cy.captureScreenshot();

        //open new account
        cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
        cy.get('#openAccountForm > .title').should('contain', 'Open New Account')
            .should('be.visible')
            .wait(200);
        cy.get('form > :nth-child(1) > b').should('be.visible').wait(200);
        cy.get('select#type').select('SAVINGS').wait(200);
        cy.get('#fromAccountId').find('option').eq(0).then(option => {
            const value = option.val();
            cy.get('#fromAccountId').select(value).wait(200);
        }); cy.get('form > div > .button').click().wait(200);
        cy.get('#openAccountResult > .title').should('be.visible').wait(200);

        //open account 
        cy.get('#newAccountId').click();
        cy.get('#accountDetails').should('be.visible');
        // Select "All" for Activity Period (months)
        cy.get('select[name="month"]').select('All');
        cy.get('select[name="transactionType"]').select('All');
        cy.get(':nth-child(3) > :nth-child(2) > .button').click();
        cy.get('tr > :nth-child(2) > a').click();
        //UI Transaction details
        cy.get('.title').should('be.visible');
        cy.get('#rightPanel').should('be.visible');
    })

    it('should let the user update information', () => {
        const user = generateFakeUser()
        cy.get('input[name="customer.firstName"]').type(user.firstName).wait(200);
        cy.get('input[name="customer.lastName"]').type(user.lastName).wait(200);
        cy.get('input[name="customer.address.street"]').type(user.address).wait(200);
        cy.get('input[name="customer.address.city"]').type(user.city).wait(200);
        cy.get('input[name="customer.address.state"]').type(user.state).wait(200);
        cy.get('input[name="customer.address.zipCode"]').type(user.zipCode).wait(200);
        cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber).wait(200);
        cy.get('input[name="customer.ssn"]').type(user.ssn).wait(200);
        cy.get('input[name="customer.username"]').type(user.username).wait(200);
        cy.get('input[name="customer.password"]').type(user.password).wait(200);
        cy.get('input[name="repeatedPassword"]').type(user.password).wait(200);
        cy.get('input[value="Register"]').click().wait(200);
        cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
        // cy.captureScreenshot();

        //update contact
        cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
        cy.get('input[name="customer.address.street"]').clear().type(user.address).wait(200);
        cy.get('input[name="customer.address.city"]').clear().type(user.city).wait(200);
        cy.get('input[name="customer.address.state"]').clear().type(user.state).wait(200);
        cy.get('input[name="customer.address.zipCode"]').clear().type(user.zipCode).wait(200);
        cy.get('[colspan="2"] > .button').click().wait(200);

    })
    it('Should logout user', () => {
        const user = generateFakeUser()
        cy.get('input[name="customer.firstName"]').type(user.firstName).wait(200);
        cy.get('input[name="customer.lastName"]').type(user.lastName).wait(200);
        cy.get('input[name="customer.address.street"]').type(user.address).wait(200);
        cy.get('input[name="customer.address.city"]').type(user.city).wait(200);
        cy.get('input[name="customer.address.state"]').type(user.state).wait(200);
        cy.get('input[name="customer.address.zipCode"]').type(user.zipCode).wait(200);
        cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber).wait(200);
        cy.get('input[name="customer.ssn"]').type(user.ssn).wait(200);
        cy.get('input[name="customer.username"]').type(user.username).wait(200);
        cy.get('input[name="customer.password"]').type(user.password).wait(200);
        cy.get('input[name="repeatedPassword"]').type(user.password).wait(200);
        cy.get('input[value="Register"]').click().wait(200);
        cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
        // cy.captureScreenshot();
        //logout
        cy.get('#leftPanel > ul > :nth-child(8) > a').click().wait(200);
    })

    it('should not allow registration with already taken username', () => {
        const user = generateFakeUser();
        user.username = 'existinguser123';
        fillRegistrationForm(user);
        cy.get('input[value="Register"]').click();
        cy.url().should('include', '/register.htm');
        cy.contains('This username already exists').should('be.visible');
    });

    it('should not allow registration with invalid SSN (too short)', () => {
        cy.fixture('parabankfixtures').then(user => {
            user.ssn = '123'; // override with invalid SSN

            cy.get('input[name="customer.firstName"]').type(user.FirstName);
            cy.get('input[name="customer.lastName"]').type(user.LastName);
            cy.get('input[name="customer.address.street"]').type(user.Address);
            cy.get('input[name="customer.address.city"]').type(user.City);
            cy.get('input[name="customer.address.state"]').type(user.State);
            cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
            cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
            cy.get('input[name="customer.ssn"]').type(user.ssn); // lowercase key
            cy.get('input[name="customer.username"]').type(user.Username);
            cy.get('input[name="customer.password"]').type(user.Password);
            cy.get('input[name="repeatedPassword"]').type(user.Confirm);
            cy.get('input[value="Register"]').click();
            cy.url().should('include', '/register.htm');
        });
    });

    it('should reject mismatched ZIP and state', () => {
        const user = generateFakeUser();
        const mismatched = getRandomStateWithZip();
        user.state = 'ZZ';
        user.zipCode = mismatched.zipCode;
        cy.get('input[name="customer.firstName"]').type(user.firstName);
        cy.get('input[name="customer.lastName"]').type(user.lastName);
        cy.get('input[name="customer.address.street"]').type(user.address);
        cy.get('input[name="customer.address.city"]').type(user.city);
        cy.get('input[name="customer.address.state"]').type(user.state);
        cy.get('input[name="customer.address.zipCode"]').type(user.zipCode);
        cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber);
        cy.get('input[name="customer.ssn"]').type(user.ssn);
        cy.get('input[name="customer.username"]').type(user.username);
        cy.get('input[name="customer.password"]').type(user.password);
        cy.get('input[name="repeatedPassword"]').type(user.repeatedPassword);
        cy.get('input[value="Register"]').click();
        cy.url().should('include', '/register.htm');
    });

    it('should only accept numbers in the phone number field', () => {
        cy.fixture('parabankfixtures').then(user => {
            user.PhoneNumber = 'abc123!!'; // invalid Phone Number
            cy.get('input[name="customer.firstName"]').type(user.FirstName);
            cy.get('input[name="customer.lastName"]').type(user.LastName);
            cy.get('input[name="customer.address.street"]').type(user.Address);
            cy.get('input[name="customer.address.city"]').type(user.City);
            cy.get('input[name="customer.address.state"]').type(user.State);
            cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
            cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
            cy.get('input[name="customer.ssn"]').type(user.ssn);
            cy.get('input[name="customer.username"]').type(user.Username);
            cy.get('input[name="customer.password"]').type(user.Password);
            cy.get('input[name="repeatedPassword"]').type(user.Confirm);
            cy.get('input[value="Register"]').click();
            cy.url().should('include', '/register.htm');
        });
    });

    it('should display required field errors', () => {
        cy.get('input[value="Register"]').click();
        cy.get('.title').should('exist').should('be.visible');
        cy.get('.error').should('be.visible');
    });

    it('should not accept updating profile if City is left blank', () => {
        cy.fixture('parabankfixtures').then(user => {
            // Register user
            cy.visit('https://parabank.parasoft.com/parabank/register.htm');
            cy.get('input[name="customer.firstName"]').type(user.FirstName);
            cy.get('input[name="customer.lastName"]').type(user.LastName);
            cy.get('input[name="customer.address.street"]').type(user.Address);
            cy.get('input[name="customer.address.city"]').type(user.City);
            cy.get('input[name="customer.address.state"]').type(user.State);
            cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
            cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
            cy.get('input[name="customer.ssn"]').type(user.ssn);
            cy.get('input[name="customer.username"]').type(`user_${Date.now()}`)
            cy.get('input[name="customer.password"]').type(user.Password);
            cy.get('input[name="repeatedPassword"]').type(user.Confirm);
            cy.get('input[value="Register"]').click();
            cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
            //blank fields
            cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
            cy.get('input[name="customer.address.street"]').clear().type(user.Address);
            cy.get('input[name="customer.address.city"]').clear().should('be.empty');
            cy.get('input[name="customer.address.state"]').clear().type(user.State);
            cy.get('input[name="customer.address.zipCode"]').clear().type(user.ZipCode);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#city-error').should('contain.text', 'City is required.').and('be.visible');
        });
    });


    it('should not accept updating profile if Zipcode is left blank', () => {
        cy.fixture('parabankfixtures').then(user => {
            // Register user
            cy.visit('https://parabank.parasoft.com/parabank/register.htm');
            cy.get('input[name="customer.firstName"]').type(user.FirstName);
            cy.get('input[name="customer.lastName"]').type(user.LastName);
            cy.get('input[name="customer.address.street"]').type(user.Address);
            cy.get('input[name="customer.address.city"]').type(user.City);
            cy.get('input[name="customer.address.state"]').type(user.State);
            cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
            cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
            cy.get('input[name="customer.ssn"]').type(user.ssn);
            cy.get('input[name="customer.username"]').type(`user_${Date.now()}`)
            cy.get('input[name="customer.password"]').type(user.Password);
            cy.get('input[name="repeatedPassword"]').type(user.Confirm);
            cy.get('input[value="Register"]').click();
            cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
            // blank fields 
            cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
            cy.get('input[name="customer.address.street"]').clear().type(user.Address);
            cy.get('input[name="customer.address.city"]').clear().type(user.City);
            cy.get('input[name="customer.address.state"]').clear().type(user.State);
            cy.get('input[name="customer.address.zipCode"]').clear();
            cy.get('[colspan="2"] > .button').click();
            cy.contains('Zip Code is required.').should('be.visible');
        });
    });

});


