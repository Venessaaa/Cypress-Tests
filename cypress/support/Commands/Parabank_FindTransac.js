//open account fixture for find transaction 
Cypress.Commands.add('fixtureAccount', () => {
    const accountType = ['SAVINGS', 'CHECKING'];
    const selectedType = Cypress._.sample(accountType);

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

    // Get the new account ID and visit it
    cy.get('#newAccountId')
        .invoke('text')
        .then((accountId) => {
            const trimmedId = accountId.trim();
            cy.get('#newAccountId').click();

            // Apply 'All' filters to ensure transaction visibility
            cy.get('select[name="month"]').select('All');
            cy.get('select[name="transactionType"]').select('All');
            cy.get(':nth-child(3) > :nth-child(2) > .button').click();
            cy.get('table#transactionTable').should('be.visible');
            cy.get('tr > :nth-child(2) > a').first().click();
        });
});

//find transaction using transaction ID - not working on website 
// Cypress.Commands.add('findTransactionID', () => {
//     cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');

//     // Apply filters with corrected selectors
//     cy.get('select[name="month"]').select('All');
//     cy.get('select[name="transactionType"]').select('All');
//     cy.get('input[type="submit"]').click(); // Submit filter

//     // Capture and verify transaction
//     cy.get('table#transactionTable tbody tr').first().within(() => {
//         cy.get('td').eq(1).find('a').invoke('text').then(transactionId => {
//             const trimmedTransactionId = transactionId.trim();
//             cy.log('Transaction ID:', trimmedTransactionId);

//             // Optional: Capture amount
//             cy.get(':nth-child(1) > [align="right"] > b').invoke('text').then(transactionAmount => {
//                 const trimmedAmount = transactionAmount.trim();
//                 cy.log('Transaction Amount:', trimmedAmount);

//                 // Go to transaction details
//                 cy.contains('a', trimmedTransactionId).click({ force: true });

//                 // Validate details
//                 cy.get('.title').should('contain', 'Transaction Details');
//                 cy.contains('Transaction ID').next().should('contain', trimmedTransactionId);
//                 cy.contains('Amount').next().should('contain', trimmedAmount);
//             });
//         });
//     });
// });

//find transaction by random amount 100-5000
Cypress.Commands.add('findTransactionAmount', () => {
    const randomAmount = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            // Select the first valid account
            cy.get('#accountId').select(selectedAccount);
            cy.get('#amount').clear().type(randomAmount.toString());
            cy.get('#findByAmount').click();
            cy.get('#resultContainer > .title').should('contain.text', 'Transaction Result').and('be.visible');

        });
});

//find transaction from two random date picker 
Cypress.Commands.add('findTransactionDateRange', () => {
    // today's date
    const today = new Date();
    // date 365 days ago from today
    const past = new Date();
    past.setDate(today.getDate() - 365);

    // two random timestamps between past and today
    const randomTimestamp1 = past.getTime() + Math.random() * (today.getTime() - past.getTime());
    const randomTimestamp2 = past.getTime() + Math.random() * (today.getTime() - past.getTime());

    // Convert to Date objects and sort them so fromDate is before toDate
    const date1 = new Date(randomTimestamp1);
    const date2 = new Date(randomTimestamp2);
    const [fromDate, toDate] = date1 < date2 ? [date1, date2] : [date2, date1];

    // Format MM-DD-YYYY
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}-${yyyy}`;
    };
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            //random date picker
            cy.get('#fromDate').clear().type(formatDate(fromDate));
            cy.get('#toDate').clear().type(formatDate(toDate));
            cy.get('#findByDateRange').click();
            cy.get('#resultContainer > .title').should('contain.text', 'Transaction Result').and('be.visible');

        });
});

//find transaction by random date 
Cypress.Commands.add('findTransactionDate', () => {
    // Today's date
    const today = new Date();

    // 365 days ago
    const past = new Date();
    past.setDate(today.getDate() - 365);

    // Generate one random date between past and today
    const randomTimestamp = past.getTime() + Math.random() * (today.getTime() - past.getTime());
    const date1 = new Date(randomTimestamp);

    // Format date as MM-DD-YYYY
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}-${yyyy}`;
    };
    const formattedDate = formatDate(date1);

    // Find Transactions page
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');

    // Select a valid account and input the random date
    cy.get('#accountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');

            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            cy.get('#transactionDate').clear().type(formattedDate);
            cy.get('#findByDate').click();
            cy.get('#resultContainer > .title').should('contain.text', 'Transaction Result').and('be.visible');
        });
});

//find transaction by date today 
Cypress.Commands.add('findTransactionDateToday', () => {
    const today = new Date();
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}-${yyyy}`;
    };
    const formattedToday = formatDate(today);
    // Find Transactions page
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    // Select a valid account and input the random date
    cy.get('#accountId')
        .should('be.visible')
        .find('option')
        .then($options => {
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            cy.get('#transactionDate').clear().type(formattedToday);
            cy.get('#findByDate').click();
            cy.get('#resultContainer > .title').should('contain.text', 'Transaction Result').and('be.visible');
            cy.get('#transactionTable').should('exist').and('be.visible');
        });
});

//find transaction negative - amount blank
Cypress.Commands.add('findTransactionAmountN1', () => {
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            // Select the first valid account
            cy.get('#accountId').select(selectedAccount);
            cy.get('#amount').clear();
            cy.get('#findByAmount').click();
            cy.get('#amountError').should('contain', 'Invalid amount').and('be.visible');

        });
});

//find transaction negative - amount is in letters
Cypress.Commands.add('findTransactionAmountN2', () => {
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            // Select the first valid account
            cy.get('#accountId').select(selectedAccount);
            cy.get('#amount').clear().type('ABC');
            cy.get('#findByAmount').click();
            cy.get('#amountError').should('contain', 'Invalid amount').and('be.visible');

        });
});
//negative - date range is empty
Cypress.Commands.add('findTransactionDateRangeN1', () => {
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            //random date picker
            cy.get('#fromDate').clear();
            cy.get('#toDate').clear();
            cy.get('#findByDateRange').click();
            cy.get('#dateRangeError').should('contain.text', 'Invalid date format').and('be.visible');
        });
});
//negative - date range is empty
Cypress.Commands.add('findTransactionDateRangeN2', () => {
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            //random date picker
            cy.get('#fromDate').clear();
            cy.get('#toDate').clear();
            cy.get('#findByDateRange').click();
            cy.get('#dateRangeError').should('contain.text', 'Invalid date format').and('be.visible');
        });
});

//find transaction from two random date picker- one is in letters
Cypress.Commands.add('findTransactionDateRangeN3', () => {
    // today's date
    const today = new Date();
    // date 365 days ago from today
    const past = new Date();
    past.setDate(today.getDate() - 365);

    // two random timestamps between past and today
    const randomTimestamp1 = past.getTime() + Math.random() * (today.getTime() - past.getTime());
    const randomTimestamp2 = past.getTime() + Math.random() * (today.getTime() - past.getTime());

    // Convert to Date objects and sort them so fromDate is before toDate
    const date1 = new Date(randomTimestamp1);
    const date2 = new Date(randomTimestamp2);
    const [fromDate, toDate] = date1 < date2 ? [date1, date2] : [date2, date1];

    // Format MM-DD-YYYY
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}-${yyyy}`;
    };
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            //random date picker
            cy.get('#fromDate').clear().type('ABC');
            cy.get('#toDate').clear().type(formatDate(toDate));
            cy.get('#findByDateRange').click();
            cy.get('#dateRangeError').should('contain.text', 'Invalid date format').and('be.visible');
        });
});

//find transaction from two random date picker- one is in special characters
Cypress.Commands.add('findTransactionDateRangeN4', () => {
    // today's date
    const today = new Date();
    // date 365 days ago from today
    const past = new Date();
    past.setDate(today.getDate() - 365);

    // two random timestamps between past and today
    const randomTimestamp1 = past.getTime() + Math.random() * (today.getTime() - past.getTime());
    const randomTimestamp2 = past.getTime() + Math.random() * (today.getTime() - past.getTime());

    // Convert to Date objects and sort them so fromDate is before toDate
    const date1 = new Date(randomTimestamp1);
    const date2 = new Date(randomTimestamp2);
    const [fromDate, toDate] = date1 < date2 ? [date1, date2] : [date2, date1];

    // Format MM-DD-YYYY
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}-${yyyy}`;
    };
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#accountId')
        .should('be.visible')
        .find('option') // all available options
        .then($options => {
            // Filter out blank/default options
            const validOptions = [...$options]
                .map(o => o.value)
                .filter(val => val && val.trim() !== '');
            // Assert we have at least one valid account
            expect(validOptions.length).to.be.greaterThan(0);
            const selectedAccount = validOptions[0];
            cy.get('#accountId').select(selectedAccount);
            //random date picker
            cy.get('#fromDate').clear().type('!@#');
            cy.get('#toDate').clear().type(formatDate(toDate));
            cy.get('#findByDateRange').click();
            cy.get('#dateRangeError').should('contain.text', 'Invalid date format').and('be.visible');
        });
});
