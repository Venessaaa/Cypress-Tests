//transer funds - happy path
Cypress.Commands.add('transferFunds', () => {
    const amount = Cypress._.random(10, 5000).toString();
    cy.visit('https://parabank.parasoft.com/parabank/transfer.htm');
    cy.get('h1.title').should('contain.text', 'Transfer Funds');
    cy.get('#amount').should('be.visible').clear().type(amount);
    cy.get('#fromAccountId')
        .find('option')
        .eq(0)
        .then(option => {
            const fromValue = option.val();
            cy.get('#fromAccountId').select(fromValue);
            cy.get('#toAccountId')
                .find('option')
                .eq(1)
                .then(toOption => {
                    const toValue = toOption.val();
                    cy.get('#toAccountId').select(toValue);
                    cy.get('input.button').click();
                    // Assert success message
                    cy.get('#showResult')
                        .should('contain.text', 'Transfer Complete');
                });
        });
});

//transfer funds - negative path blank field 
Cypress.Commands.add('transferFundsN', () => {
    cy.visit('https://parabank.parasoft.com/parabank/transfer.htm');
    cy.get('h1.title').should('contain.text', 'Transfer Funds');
    cy.get('#amount').should('be.visible').clear();
    cy.get('#fromAccountId')
        .find('option')
        .eq(0)
        .then(option => {
            const fromValue = option.val();
            cy.get('#fromAccountId').select(fromValue);
            cy.get('#toAccountId')
                .find('option')
                .eq(1)
                .then(toOption => {
                    const toValue = toOption.val();
                    cy.get('#toAccountId').select(toValue);
                    cy.get('input.button').click();
                    cy.get('#showError')
                        .should('contain.text', 'Error').and('exist');
                });
        });
});
//transferfunds negative 2 letters 
Cypress.Commands.add('transferFundsN2', () => {
    const amount = 'ABC';
    cy.visit('https://parabank.parasoft.com/parabank/transfer.htm');
    cy.get('h1.title').should('contain.text', 'Transfer Funds');
    cy.get('#amount').should('be.visible').clear().type(amount);
    cy.get('#fromAccountId')
        .find('option')
        .eq(0)
        .then(option => {
            const fromValue = option.val();
            cy.get('#fromAccountId').select(fromValue);
            cy.get('#toAccountId')
                .find('option')
                .eq(1)
                .then(toOption => {
                    const toValue = toOption.val();
                    cy.get('#toAccountId').select(toValue);
                    cy.get('input.button').click();
                    cy.get('#showError')
                        .should('contain.text', 'Error').and('exist');
                });
        });
});
//transfer funds - negative 3 special characters 
Cypress.Commands.add('transferFundsN3', () => {
    const amount = '!@#';
    cy.visit('https://parabank.parasoft.com/parabank/transfer.htm');
    cy.get('h1.title').should('contain.text', 'Transfer Funds');
    cy.get('#amount').should('be.visible').clear().type(amount);
    cy.get('#fromAccountId')
        .find('option')
        .eq(0)
        .then(option => {
            const fromValue = option.val();
            cy.get('#fromAccountId').select(fromValue);
            cy.get('#toAccountId')
                .find('option')
                .eq(1)
                .then(toOption => {
                    const toValue = toOption.val();
                    cy.get('#toAccountId').select(toValue);
                    cy.get('input.button').click();
                    cy.get('#showError')
                        .should('contain.text', 'Error').and('exist');
                });
        });
});
