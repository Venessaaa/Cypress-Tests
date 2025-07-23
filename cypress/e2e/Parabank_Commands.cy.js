
import { generateFakeUser } from '../utils/ParabankUtils';
import { registerUser } from '../support/Commands/Parabank_commands';
import { registerWExisting } from '../support/Commands/Parabank_commands';
import { updateProfileA } from '../support/Commands/Parabank_commands';

describe('Parabank custome command tests', () => {
    //register
    it('Should register a user successfully', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
    });

    it('should show an error when trying to register using an existing username', () => {
        cy.registerWExisting();
    });

    //Open new account    
    it('Should let the user open new account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
    });

    //pay bills
    it('Should let the user pay bills', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.openAccount();
        cy.billPayment();
    });

    //overview account 
    it('Should reflect all of the created account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.accountOverview();
    });

    //transfer funds
    it('Should be able to transfer funds to another account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFunds();
    });

    //find transactions - not yet done
    // it.only('Should be able to search transactions using transaction ID', () => {
    //     const user = generateFakeUser();
    //     cy.registerUser(user);
    //     // cy.fixtureAccount();
    //     cy.findTransactionID();
    // });

    //find transaction by amount
    it('Should be able to search transactions using Amount', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionAmount();
    });
    //find transaction using date range 
    it('Should be able to search transactions using Date range', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateRange();
    });
    //find transaction using random date
    it('Should be able to search transactions using Date', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDate();
    });

    //find transaction using date today
    it('Should be able to search transactions using Date', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateToday();
    });
    
    //request loan
    it.only('Should be able to request loan', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.requestLoan();
    });

    //update profile 
    //positive
    it('Should update user address information', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.updateProfileA();
    })

    //negative 
    it('Should produce error when City is blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profileCityErr();
    })
    it('Should produce error when State is blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profilestateErr();
    })

    //logout 
    it('Should logout user', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.logout();
    })
});


