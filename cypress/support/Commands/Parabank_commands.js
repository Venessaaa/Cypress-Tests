import { generateFakeUser } from "../../utils/ParabankUtils";

const user = new generateFakeUser();

//register page including validation of forms/textfields 
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

//register part with existing username 
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
        cy.get('#customer\.username\.errors').contains('This username already exists').should('be.visible');
    });
});

//open account command
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

    // Capture and click new account ID
    cy.get('#newAccountId')
        .invoke('text')
        .then((newAccountId) => {
            const trimmedId = newAccountId.trim();

            // Go to account details page
            cy.get('#newAccountId').click();

            // Confirm account number matches
            cy.contains(`Account Number: ${trimmedId}`).should('be.visible');

            // Confirm account info
            cy.contains('td', 'Account Type:').next().should('contain.text', selectedType);
            cy.contains('td', 'Balance:').next().should('contain.text', '$');
            cy.contains('td', 'Available:').next().should('contain.text', '$');

            // Proceed to transaction filters
            cy.log('Filtering transactions...');
            cy.filterTransactions('All', 'All');
        });
});

//for account activity selectors and table
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

// accounts overview 
Cypress.Commands.add('accountOverview', () => {
    cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
    cy.get('table tbody tr').each(($row) => {
        const $cells = $row.find('td');

        // Skip row if it's the "Total" row
        if (Cypress.$($cells[0]).text().trim().toLowerCase().includes('total')) {
            return;
        }

        const accountNumber = Cypress.$($cells[0]).text().trim();
        const balance = Cypress.$($cells[1]).text().trim();
        const available = Cypress.$($cells[2]).text().trim();

        expect(accountNumber).to.match(/^\d+$/);
        expect(balance).to.include('$');
        expect(available).to.include('$');
    });
});

//transer funds 
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

//updating profile command 
Cypress.Commands.add('updateProfileA', () => {
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
    cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');
    cy.get('input[name="customer.address.street"]').clear().type(user.address);
    cy.get('input[name="customer.address.city"]').clear().type(user.city);
    cy.get('input[name="customer.address.state"]').clear();
    cy.get('input[name="customer.address.zipCode"]').clear().type(user.zipCode);
    cy.get('[colspan="2"] > .button').click();
    cy.get('#state-error').should('contain', 'State is required.').and('be.visible');
});

//request loan 
Cypress.Commands.add('requestLoan', () => {
    const randomAmount = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;
    const downPayment = 20;

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

//logout command
Cypress.Commands.add('logout', () => {
    cy.get('#leftPanel > ul > :nth-child(8) > a').click().wait(200);
});

