import { generateFakeUser } from "../../utils/ParabankUtils";

const user = new generateFakeUser();

//register page including validation of forms/textfields - positive
Cypress.Commands.add('registerUser', (user) => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm'); //registration page
    //registration verification
    const fields = [
        { name: 'customer.firstName', value: user.FirstName || user.firstName, placeholder: 'First Name' },
        { name: 'customer.lastName', value: user.LastName || user.lastName, placeholder: 'Last Name' },
        { name: 'customer.address.street', value: user.Address || user.address, placeholder: 'Address' },
        { name: 'customer.address.city', value: user.City || user.city, placeholder: 'City' },
        { name: 'customer.address.state', value: user.State || user.state, placeholder: 'State' },
        { name: 'customer.address.zipCode', value: user.ZipCode || user.zipCode, placeholder: 'Zip Code' },
        { name: 'customer.phoneNumber', value: user.PhoneNumber || user.phoneNumber, placeholder: 'Phone #' },
        { name: 'customer.ssn', value: user.ssn, placeholder: 'SSN' },
        { name: 'customer.username', value: user.Username || user.username || `user_${Date.now()}`, placeholder: 'Username' },
        { name: 'customer.password', value: user.Password || user.password, placeholder: 'Password' },
        { name: 'repeatedPassword', value: user.Confirm || user.password, placeholder: 'Confirm' }
    ];
    //validation of each fied in register 
    fields.forEach(field => {
        const selector = `input[name="${field.name}"]`;
        cy.get(selector)
            .should('be.visible')
            .should('have.value', '')
            .invoke('attr', 'placeholder')
            .then(placeholder => {
                if (placeholder) {
                    expect(placeholder.toLowerCase()).to.include(field.placeholder.toLowerCase());
                }
            });

        cy.get(selector).type(field.value);
    });

    // Submit form
    cy.get('input[value="Register"]').click();
});

//register part with existing username - negative 
Cypress.Commands.add('registerWExisting', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    cy.fixture('parabankfixtures').then(user => {
        user.Username = 'existinguser123'; // overriding username 

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
        cy.get(':nth-child(10) > [width="50%"]').should('contain', "This username already exists.").and('be.visible');
    });
});

//register page - negative - all fields from first name to ssn are empty
Cypress.Commands.add('registerUserN1', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    cy.fixture('parabankfixtures').then(user => {
        const randomUsername = `user_${Date.now()}`;
        cy.get('input[name="customer.firstName"]').clear();
        cy.get('input[name="customer.lastName"]').clear();
        cy.get('input[name="customer.address.street"]').clear();
        cy.get('input[name="customer.address.city"]').clear();
        cy.get('input[name="customer.address.state"]').clear();
        cy.get('input[name="customer.address.zipCode"]').clear();
        cy.get('input[name="customer.phoneNumber"]').clear();
        cy.get('input[name="customer.ssn"]').clear();
        cy.get('input[name="customer.username"]').type(randomUsername);
        cy.get('input[name="customer.password"]').type(user.Password);
        cy.get('input[name="repeatedPassword"]').type(user.Confirm);
        cy.get('input[value="Register"]').click();

        //errors 
        cy.get(':nth-child(1) > [width="50%"]').should('contain', "First name is required.").and('be.visible');
        cy.get(':nth-child(2) > [width="50%"]').should('contain', "Last name is required.").and('be.visible');
        cy.get(':nth-child(3) > [width="50%"]').should('contain', "Address is required.").and('be.visible');
        cy.get(':nth-child(4) > [width="50%"]').should('contain', "City is required").and('be.visible');
        cy.get(':nth-child(5) > [width="50%"]').should('contain', "State is required.").and('be.visible');
        cy.get(':nth-child(6) > [width="50%"]').should('contain', "Zip Code is required.").and('be.visible');
        cy.get(':nth-child(8) > [width="50%"]').should('contain', "Social Security Number is required.").and('be.visible');

    });
});


//for account activity selectors and table - happy path 
Cypress.Commands.add('filterTransactions', () => {
    // Pick filters
    const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const transactionTypes = ['All', 'Credit', 'Debit'];

    const selectedMonth = Cypress._.sample(months);
    const selectedType = Cypress._.sample(transactionTypes);

    cy.log(`Filtering transactions: Month = ${selectedMonth}, Type = ${selectedType}`);

    // Apply filters
    cy.get('select[name="month"]').select(selectedMonth).should('have.value', selectedMonth);
    cy.get('select[name="transactionType"]').select(selectedType).should('have.value', selectedType);

    // Submit filter
    cy.get(':nth-child(3) > :nth-child(2) > .button').click();

    cy.get('#rightPanel').should('be.visible').then($panel => {
        const panelText = $panel.text();

        if (panelText.includes('No transactions found')) {
            // If filtering by specific month/type with no match
            if (selectedMonth !== 'All' || selectedType !== 'All') {
                cy.contains('No transactions found').should('be.visible');
                cy.log('No transactions found as expected.');
            } else {
                cy.get('tr > :nth-child(2) > a').click();

            }
        } else {
            // Transaction table should appear
            cy.get('#transactionTable').should('be.visible');

            // Assert transaction row content
            cy.get('table#transactionTable tbody tr').first().within(() => {
                cy.get('td').eq(0).should('match', /\d{2}-\d{2}-\d{4}/); // Date
                cy.get('td').eq(1).should('contain.text', 'Funds Transfer'); // Transaction
                cy.get('td').eq(2).invoke('text').then(debit => {
                    cy.get('td').eq(3).invoke('text').then(credit => {
                        if (selectedType === 'Credit') {
                            expect(credit.trim()).to.not.equal('');
                            expect(debit.trim()).to.equal('');
                        } else if (selectedType === 'Debit') {
                            expect(debit.trim()).to.not.equal('');
                            expect(credit.trim()).to.equal('');
                        } else {
                            // All — at least one should not be empty
                            expect(credit.trim() !== '' || debit.trim() !== '').to.be.true;
                        }
                    });
                });
            });

            // Visit the transaction detail page
            cy.get('table#transactionTable tbody tr')
                .first()
                .find('td:nth-child(2) a')
                .click({ force: true });

            cy.get('.title').should('contain.text', 'Transaction Details');
        }
    });
});

//logout command
Cypress.Commands.add('logout', () => {
    cy.get('#leftPanel > ul > :nth-child(8) > a').click().wait(200);
});

