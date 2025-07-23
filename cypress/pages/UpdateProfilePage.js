export class UpdateProfilePage {
    visit() {
        cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
    }
    updateAddress({ address, city, state, zip }) {
        if (address) {
            cy.get('input[name="customer.address.street"]').clear().type(address);
        }
        if (city) {
            cy.get('input[name="customer.address.city"]').clear().type(city);
        }
        if (state) {
            cy.get('input[name="customer.address.state"]').clear().type(state);
        }
        if (zip) {
            cy.get('input[name="customer.address.zipCode"]').clear();
        }
    }

    submitAddress() {
        cy.get('[colspan="2"] > .button').click();
    }
    AddressError() {
        cy.get('#street-error').should('contain.text', 'Address is required.').and('be.visible');
    }

    updateFields({ address, city, state, zip }) {
        if (address) {
            cy.get('input[name="customer.address.street"]').clear().type(address);
        }
        if (city) {
            cy.get('input[name="customer.address.city"]').clear();
        }
        if (state) {
            cy.get('input[name="customer.address.state"]').clear().type(state);
        }
        if (zip) {
            cy.get('input[name="customer.address.zipCode"]').clear().type(zip);
        }
    }
    submit() {
        cy.get('[colspan="2"] > .button').click();
    }
    assertCityError() {
        cy.get('#city-error').should('contain.text', 'City is required.').and('be.visible');
    }

    updateFirstName({ firstName, address, city, state, zip }) {
         if (firstName) {
            cy.get('input[name="customer.firstName"]').clear();
        }
        if (address) {
            cy.get('input[name="customer.address.street"]').clear().type(address);
        }
        if (city) {
            cy.get('input[name="customer.address.city"]').clear().type(city);
        }
        if (state) {
            cy.get('input[name="customer.address.state"]').clear().type(state);
        }
        if (zip) {
            cy.get('input[name="customer.address.zipCode"]').clear().type(zip);
        }
    }
    firstNamesubmit() {
        cy.get('[colspan="2"] > .button').click();
    }
    // assertCityError() {
    //     cy.get('#city-error').should('contain.text', 'City is required.').and('be.visible');
    // }

}
