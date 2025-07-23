//bill payments
Cypress.Commands.add('billPayment', () => {
    const amount = Cypress._.random(10, 5000).toString();
    cy.visit('https://parabank.parasoft.com/parabank/billpay.htm');
    cy.fixture('parabankfixtures').then(user => {
        user.AccountNumber = user.AccountNumber || '12345';
        const fields = [
            { name: 'payee.name', value: `${user.FirstName} ${user.LastName}`, placeholder: 'Payee Name' },
            { name: 'payee.address.street', value: user.Address || user.address, placeholder: 'Address' },
            { name: 'payee.address.city', value: user.City || user.city, placeholder: 'City' },
            { name: 'payee.address.state', value: user.State || user.state, placeholder: 'State' },
            { name: 'payee.address.zipCode', value: user.ZipCode || user.zipCode, placeholder: 'Zip Code' },
            { name: 'payee.phoneNumber', value: user.PhoneNumber || user.phoneNumber, placeholder: 'Phone Number' },
            { name: 'payee.accountNumber', value: user.AccountNumber, placeholder: 'Account Number' },
            { name: 'verifyAccount', value: user.AccountNumber, placeholder: 'Verify Account' }
        ];

        // Fill all payee fields
        fields.forEach(field => {
            const selector = `input[name="${field.name}"]`;
            cy.get(selector)
                .should('be.visible')
                .invoke('attr', 'placeholder')
                .then(placeholder => {
                    if (placeholder) {
                        expect(placeholder.toLowerCase()).to.include(field.placeholder.toLowerCase());
                    }
                });

            cy.get(selector).type(field.value);
        });
        // Types random amount
        cy.get('input[name="amount"]')
            .should('be.visible')
            .should('have.value', '')
            .type(amount);

        cy.get('select[name="fromAccountId"] option').then($options => {
            // Filter out empty or invalid options (like placeholders)
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');

            // Select a random valid account ID
            const randomAccountId = Cypress._.sample(validOptions);
            cy.get('select[name="fromAccountId"]').select(randomAccountId);
        });

        // Submit
        cy.get('input.button').click();
        cy.get('#rightPanel').should('contain.text', 'Bill Payment Complete');
    });
});

//negative account number is in special characters
Cypress.Commands.add('billPaymentN1', () => {
    const amount = Cypress._.random(10, 5000).toString();
    cy.visit('https://parabank.parasoft.com/parabank/billpay.htm');
    cy.fixture('parabankfixtures').then(user => {
        user.AccountNumber = user.AccountNumber || '!@#';
        const fields = [
            { name: 'payee.name', value: `${user.FirstName} ${user.LastName}`, placeholder: 'Payee Name' },
            { name: 'payee.address.street', value: user.Address || user.address, placeholder: 'Address' },
            { name: 'payee.address.city', value: user.City || user.city, placeholder: 'City' },
            { name: 'payee.address.state', value: user.State || user.state, placeholder: 'State' },
            { name: 'payee.address.zipCode', value: user.ZipCode || user.zipCode, placeholder: 'Zip Code' },
            { name: 'payee.phoneNumber', value: user.PhoneNumber || user.phoneNumber, placeholder: 'Phone Number' },
            { name: 'payee.accountNumber', value: user.AccountNumber, placeholder: 'Account Number' },
            { name: 'verifyAccount', value: user.AccountNumber, placeholder: 'Verify Account' }
        ];

        // Fill all payee fields
        fields.forEach(field => {
            const selector = `input[name="${field.name}"]`;
            cy.get(selector)
                .should('be.visible')
                .invoke('attr', 'placeholder')
                .then(placeholder => {
                    if (placeholder) {
                        expect(placeholder.toLowerCase()).to.include(field.placeholder.toLowerCase());
                    }
                });

            cy.get(selector).type(field.value);
        });
        // Types random amount
        cy.get('input[name="amount"]')
            .should('be.visible')
            .should('have.value', '')
            .type(amount);

        cy.get('select[name="fromAccountId"] option').then($options => {
            // Filter out empty or invalid options (like placeholders)
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');

            // Select a random valid account ID
            const randomAccountId = Cypress._.sample(validOptions);
            cy.get('select[name="fromAccountId"]').select(randomAccountId);
        });

        // Submit
        cy.get('input.button').click();
        cy.get('#validationModel-account-invalid').should('have.text', "Please enter a valid number.").and('be.visible');
        cy.get('#validationModel-verifyAccount-invalid').should('have.text', "Please enter a valid number.").and('be.visible');
    });
});

//negative path - input letters to account number
Cypress.Commands.add('billPaymentN2', () => {
    const amount = Cypress._.random(10, 5000).toString();
    cy.visit('https://parabank.parasoft.com/parabank/billpay.htm');
    cy.fixture('parabankfixtures').then(user => {
        user.AccountNumber = user.AccountNumber || 'ABC';
        const fields = [
            { name: 'payee.name', value: `${user.FirstName} ${user.LastName}`, placeholder: 'Payee Name' },
            { name: 'payee.address.street', value: user.Address || user.address, placeholder: 'Address' },
            { name: 'payee.address.city', value: user.City || user.city, placeholder: 'City' },
            { name: 'payee.address.state', value: user.State || user.state, placeholder: 'State' },
            { name: 'payee.address.zipCode', value: user.ZipCode || user.zipCode, placeholder: 'Zip Code' },
            { name: 'payee.phoneNumber', value: user.PhoneNumber || user.phoneNumber, placeholder: 'Phone Number' },
            { name: 'payee.accountNumber', value: user.AccountNumber, placeholder: 'Account Number' },
            { name: 'verifyAccount', value: user.AccountNumber, placeholder: 'Verify Account' }
        ];

        // Fill all payee fields
        fields.forEach(field => {
            const selector = `input[name="${field.name}"]`;
            cy.get(selector)
                .should('be.visible')
                .invoke('attr', 'placeholder')
                .then(placeholder => {
                    if (placeholder) {
                        expect(placeholder.toLowerCase()).to.include(field.placeholder.toLowerCase());
                    }
                });

            cy.get(selector).type(field.value);
        });
        // Types random amount
        cy.get('input[name="amount"]')
            .should('be.visible')
            .should('have.value', '')
            .type(amount);

        cy.get('select[name="fromAccountId"] option').then($options => {
            // Filter out empty or invalid options (like placeholders)
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');

            // Select a random valid account ID
            const randomAccountId = Cypress._.sample(validOptions);
            cy.get('select[name="fromAccountId"]').select(randomAccountId);
        });

        // Submit
        cy.get('input.button').click();
        cy.get('#validationModel-account-invalid').should('have.text', "Please enter a valid number.").and('be.visible');
        cy.get('#validationModel-verifyAccount-invalid').should('have.text', "Please enter a valid number.").and('be.visible');
    });
});

//all fields are left blank
Cypress.Commands.add('billPaymentN3', () => {
    cy.visit('https://parabank.parasoft.com/parabank/billpay.htm');
    cy.fixture('parabankfixtures').then(user => {
        user.AccountNumber = user.AccountNumber || 'ABC';
        const fields = [
            { name: 'payee.name', value: ` `, placeholder: 'Payee Name' },
            { name: 'payee.address.street', value: ` `, placeholder: 'Address' },
            { name: 'payee.address.city', value: ` `, placeholder: 'City' },
            { name: 'payee.address.state', value: ` `, placeholder: 'State' },
            { name: 'payee.address.zipCode', value: ` `, placeholder: 'Zip Code' },
            { name: 'payee.phoneNumber', value: ` `, placeholder: 'Phone Number' },
            { name: 'payee.accountNumber', value: ` `, placeholder: 'Account Number' },
            { name: 'verifyAccount', value: ` `, placeholder: 'Verify Account' }
        ];

        // Fill all payee fields
        fields.forEach(field => {
            const selector = `input[name="${field.name}"]`;
            cy.get(selector)
                .should('be.visible')
                .invoke('attr', 'placeholder')
                .then(placeholder => {
                    if (placeholder) {
                        expect(placeholder.toLowerCase()).to.include(field.placeholder.toLowerCase());
                    }
                });

            cy.get(selector).type(field.value);
        });
        // Types random amount
        cy.get('input[name="amount"]')
            .should('be.visible')
            .should('have.value', '')
            .clear();

        cy.get('select[name="fromAccountId"] option').then($options => {
            // Filter out empty or invalid options (like placeholders)
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');

            // Select a random valid account ID
            const randomAccountId = Cypress._.sample(validOptions);
            cy.get('select[name="fromAccountId"]').select(randomAccountId);
        });

        // Submit
        cy.get('input.button').click();
        cy.get('#validationModel-name').should('contain', "Payee name is required.").and('be.visible');
        cy.get('#validationModel-address').should('contain', "Address is required.").and('be.visible');
        cy.get('#validationModel-city').should('contain', "City is required.").and('be.visible');
        cy.get('#validationModel-state').should('contain', "State is required.").and('be.visible');
        cy.get('#validationModel-zipCode').should('contain', "Zip Code is required.").and('be.visible');
        cy.get('#validationModel-phoneNumber').should('contain', "Phone number is required.").and('be.visible');
        cy.get('#validationModel-account-empty').should('contain', "Account number is required.").and('be.visible');
        cy.get('#validationModel-verifyAccount-empty').should('contain', "Account number is required.").and('be.visible');
        cy.get('#validationModel-amount-empty').should('contain', "The amount cannot be empty.").and('be.visible');
    });
});