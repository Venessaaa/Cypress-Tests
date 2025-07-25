//open account command - happy path - as of now no negative path for open account
Cypress.Commands.add('openAccount', () => {
    const accountTypes = ['SAVINGS', 'CHECKING'];
    const selectedType = Cypress._.sample(accountTypes);
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

            cy.visit(`https://parabank.parasoft.com/parabank/activity.htm?id=${accountId}`);
            cy.wait(500);
            cy.get('table#transactionTable tbody tr')
                .first()
                .find('td:nth-child(2) a')
                .click({ force: true });

            cy.get('.title').should('contain.text', 'Transaction Details');
        }
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
            cy.visit(`https://parabank.parasoft.com/parabank/activity.htm?id=${accountId}`);
            cy.wait(500);
            cy.get('.title').should('contain.text', 'Account Details');
            cy.get('#transactionTable').should('exist');
        });
});
