//open account command - happy path - as of now no negative path for open account
Cypress.Commands.add('openAccount', () => {
    const accountTypes = ['SAVINGS', 'CHECKING'];
    const selectedType = Cypress._.sample(accountTypes);

    // Visit Open Account Page
    cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
    cy.get('#openAccountForm > .title')
        .should('contain', 'Open New Account')
        .should('be.visible').wait(250);

    // Select Account Type
    cy.get('select#type').select(selectedType).wait(250);

    // Select From Account
    cy.get('#fromAccountId option').eq(0).then(option => {
        const value = option.val();
        cy.get('#fromAccountId').select(value).wait(250);
    });

    // Submit Open Account
    cy.get('form > div > .button').click().wait(250);

    // Assertion: Check that the new account was created
    cy.get('#newAccountId')
        .should('exist')
        .and('be.visible')
        .then($id => {
            const accountId = $id.text();
            cy.log(`New account created with ID: ${accountId}`);
        });
});

//review the information from newly created account 
Cypress.Commands.add('reviewNewAccountInfo', () => {
    // Get new account ID from the confirmation page
    cy.get('#newAccountId')
        .should('exist')
        .and('be.visible')
        .then($id => {
            const accountId = $id.text().trim();
            cy.log(`Reviewing account ID: ${accountId}`);

            // Visit account activity page
            cy.visit(`https://parabank.parasoft.com/parabank/activity.htm?id=${accountId}`);
            cy.get('.title').should('contain.text', 'Account Details');
            cy.get('#transactionTable').should('exist');
        });
});
