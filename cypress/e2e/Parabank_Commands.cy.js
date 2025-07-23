
import { generateFakeUser } from '../utils/ParabankUtils';
import { } from '../support/Commands/Parabank_Register';
import { } from '../support/Commands/Parabank_Transfer';
import { } from '../support/Commands/Parabank_OpenAcct';
import { } from '../support/Commands/Parabank_Overview';
import { } from '../support/Commands/Parabank_PayBills';
import { } from '../support/Commands/Parabank_FindTransac';
import { } from '../support/Commands/Parabank_Updateprof';
import { } from '../support/Commands/Parabank_ReqLoan';

describe('Parabank custom command tests', () => {
    //register
    it('Register - Should register a user successfully', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
    });

    //register with empty fields from first name to SSN
    it('Register - Should show errors if fields from first name to SSN are blank', () => {
        const user = generateFakeUser();
        cy.registerUserN1(user);
    });

    //registering with existing username
    it('Register - should show an error when trying to register using an existing username', () => {
        cy.registerWExisting();
    });

    //Open new account    
    it('Open Account - Should let the user open new account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
    });

    //Open new account    
    it('Open Account - Should let the user view the information on the newly created account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
    });

    //view transaction on account activity 
    it('Account Activity - Should let the user see the transaction on the Account Activity ', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.filterTransactions();
    });

    //overview account 
    it('Account Overview - Should reflect all of the created account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.accountOverview();
    });

    //transfer funds
    it('Transfer funds - Should be able to transfer funds to another account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFunds();
    });

    //transfer funds - negative 
    it('Transfer funds - Should show error message if amount field is left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN();
    });

    //transfer funds - negative 2
    it('Transfer funds - Should show error message if entered amount is letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN2();
    });

    //transfer funds - negative 3
    it('Transfer funds - Should show error message if entered amount is special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN3();
    });

    //pay bills
    it('Bill pay - Should let the user pay bills', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPayment();
    });
    //negative 
    it('Bill pay - Should show error if the account number is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN1();
    });
    //negative 
    it('Bill pay - Should show error if typed Account number is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN2();
    });
    //negative
    it('Bill pay - Should show error if all fields are left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN3();
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
    //find transaction by amount - negative 
    it('Should show error if amount is empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN1();
    });
    //find transaction by amount - negative 
    it('Should show error if amount is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN2();
    });

    //find transaction using date range 
    it('Should be able to search transactions using Date range', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateRange();
    });

    //find transaction date is empty 
    it('Should show error if two dates are empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN1();
    });

    //find transaction date is empty 
    it('Should show error if one date range is empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN2();
    });

    //find transaction date is empty 
    it('Should show error if one date range is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN3();
    });

    //find transaction date is empty 
    it('Should show error if one date range is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN4();
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

    //update profile 
    //positive
    it('Should update user address information', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.updateProfileA();
    });

    //negative 
    it('Should produce error when City is blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profileCityErr();
    });

    //request loan
    it('Should be able to request loan', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoan();
    });

    //request loan negative
    it('Should show error if the entered amount is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN1();
    });

    //request loan negative
    it('Should show error if the entered amount left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN2();
    });

    //request loan negative
    it('Should show error if the entered amount is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN3();
    });

    //request loan negative
    it('Should show error if the entered downpayment is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN4();
    });

    //request loan negative
    it('Should show error if the downpayment is left blank ', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN5();
    });

    //request loan negative
    it('Should show error if the entered downpayment is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN6();
    });
    //logout 
    it('Should logout user', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.logout();
    })
});


