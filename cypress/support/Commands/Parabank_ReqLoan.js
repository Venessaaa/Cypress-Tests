//request loan 
Cypress.Commands.add('requestLoan', () => {
    const randomAmount = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;
    const downPayment = 20;
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type(randomAmount.toString());
    cy.get('#downPayment').clear().type(downPayment.toString());
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();

            //loan status - approved or denied 
            cy.get('#loanStatus').should('be.visible').then($status => {
                const statusText = $status.text();
                if (statusText.includes('Denied')) {
                    cy.contains('We cannot grant a loan in that amount with your available funds.').should('be.visible');
                } else if (statusText.includes('Approved')) {
                    cy.contains('Congratulations, your loan has been approved.').should('be.visible');
                    cy.contains('Your new account number:').should('be.visible');
                }
            });
        });
});
//letters 
Cypress.Commands.add('requestLoanN1', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type('ABC');
    cy.get('#downPayment').clear().type('20');
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});
//blank 
Cypress.Commands.add('requestLoanN2', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear();
    cy.get('#downPayment').clear().type('20');
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});
//special characters 
Cypress.Commands.add('requestLoanN3', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type('!@#');
    cy.get('#downPayment').clear().type('20');
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});
//letters in dp
Cypress.Commands.add('requestLoanN4', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type('300');
    cy.get('#downPayment').clear().type('ABC');
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});
//blank in dp 
Cypress.Commands.add('requestLoanN5', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type('300');
    cy.get('#downPayment').clear();
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});
//special characters in dp
Cypress.Commands.add('requestLoanN6', () => {
    cy.wait(1000);
    cy.visit('https://parabank.parasoft.com/parabank/requestloan.htm');
    cy.get('#amount').clear().type('300');
    cy.get('#downPayment').clear().type('!@#');
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#fromAccountId').select(selectedAccount);
            cy.get('[colspan="2"] > .button').click();
            cy.get('#requestLoanError').should('contain', "An internal error has occurred and has been logged").should('exist').and('be.visible');
        });
});