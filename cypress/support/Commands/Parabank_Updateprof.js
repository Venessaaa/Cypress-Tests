import { generateFakeUser } from "../../utils/ParabankUtils";
const user = new generateFakeUser();
//updating profile command 
Cypress.Commands.add('updateProfileA', () => {
    cy.wait(500);
    cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
    cy.get('input[name="customer.address.street"]').clear().type(user.address);
    cy.get('input[name="customer.address.city"]').clear().type(user.city);
    cy.get('input[name="customer.address.state"]').clear().type(user.state);
    cy.get('input[name="customer.address.zipCode"]').clear().type(user.zipCode);
    cy.get('[colspan="2"] > .button').click();
    cy.get('#updateProfileResult > .title').should('contain', 'Profile Updated').should('exist').and('be.visible')
});

//city is blank 
Cypress.Commands.add('profileCityErr', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
    cy.get('input[name="customer.address.street"]').clear().type(user.address);
    cy.get('input[name="customer.address.city"]').clear();
    cy.get('input[name="customer.address.state"]').clear().type(user.state);
    cy.get('input[name="customer.address.zipCode"]').clear().type(user.zipCode);
    cy.get('[colspan="2"] > .button').click();
    cy.get('#city-error').should('contain', 'City is required.').and('be.visible');
});
//state is blank 
Cypress.Commands.add('profilestateErr', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
    cy.get('input[name="customer.address.street"]').clear().type(user.address);
    cy.get('input[name="customer.address.city"]').clear().type(user.city);
    cy.get('input[name="customer.address.state"]').clear();
    cy.get('input[name="customer.address.zipCode"]').clear().type(user.zipCode);
    cy.get('[colspan="2"] > .button').click();
    cy.get('#state-error').should('contain', 'State is required.').and('be.visible');
});