
import { generateFakeUser } from '../../utils/ParabankUtils';
import { } from '../../support/Commands/Parabank_Register';
import { } from '../../support/Commands/Parabank_Transfer';
import { } from '../../support/Commands/Parabank_OpenAcct';
import { } from '../../support/Commands/Parabank_Overview';
import { } from '../../support/Commands/Parabank_PayBills';
import { } from '../../support/Commands/Parabank_FindTransac';
import { } from '../../support/Commands/Parabank_Updateprof';
import { } from '../../support/Commands/Parabank_ReqLoan';
import '../../support/Commands/command';

describe('Parabank custom command tests', () => {
    //register
    it('Register - Should register a user successfully', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.captureScreenshot();
    });

    //register with empty fields from first name to SSN
    it('Register - Should show errors if fields from first name to SSN are blank', () => {
        const user = generateFakeUser();
        cy.registerUserN1(user);
        cy.captureScreenshot();
    });

    //registering with existing username
    it('Register - should show an error when trying to register using an existing username', () => {
        cy.registerWExisting();
        cy.captureScreenshot();
    });

    //Open new account    
    it('Open Account - Should let the user open new account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.captureScreenshot();
    });

    //Open new account    
    it('Open Account - Should let the user view the information on the newly created account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.captureScreenshot();
    });

    //view transaction on account activity 
    it('Account Activity - Should let the user see the transaction on the Account Activity ', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.filterTransactions();
        cy.captureScreenshot();
    });

    //overview account 
    it('Account Overview - Should reflect all of the created account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.accountOverview();
        cy.captureScreenshot();
    });

    //transfer funds
    it('Transfer funds - Should be able to transfer funds to another account', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFunds();
        cy.captureScreenshot();
    });

    //transfer funds - negative 
    it('Transfer funds - Should show error message if amount field is left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN();
        cy.captureScreenshot();
    });

    //transfer funds - negative 2
    it('Transfer funds - Should show error message if entered amount is letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN2();
        cy.captureScreenshot();
    });

    //transfer funds - negative 3
    it('Transfer funds - Should show error message if entered amount is special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN3();
        cy.captureScreenshot();
    });

    //pay bills
    it('Bill pay - Should let the user pay bills', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPayment();
        cy.captureScreenshot();
    });
    //negative 
    it('Bill pay - Should show error if the account number is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN1();
        cy.captureScreenshot();
    });
    //negative 
    it('Bill pay - Should show error if typed Account number is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN2();
        cy.captureScreenshot();
    });
    //negative
    it('Bill pay - Should show error if all fields are left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN3();
        cy.captureScreenshot();
    });

    //find transactions - not working on website
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
        cy.captureScreenshot();
    });
    //find transaction by amount - negative 
    it('Should show error if amount is empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN1();
        cy.captureScreenshot();
    });
    //find transaction by amount - negative 
    it('Should show error if amount is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN2();
        cy.captureScreenshot();
    });

    //find transaction using date range 
    it('Should be able to search transactions using Date range', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateRange();
        cy.captureScreenshot();
    });

    //find transaction date is empty 
    it('Should show error if two dates are empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN1();
        cy.captureScreenshot();
    });

    //find transaction date is empty 
    it('Should show error if one date range is empty', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN2();
        cy.captureScreenshot();
    });

    //find transaction date is empty 
    it('Should show error if one date range is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN3();
        cy.captureScreenshot();
    });

    //find transaction date is empty 
    it('Should show error if one date range is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN4();
        cy.captureScreenshot();
    });

    //find transaction using random date
    it('Should be able to search transactions using Date', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDate();
        cy.captureScreenshot();
    });

    //find transaction using date today
    it('Should be able to search transactions using Date', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateToday();
        cy.captureScreenshot();
    });

    //update profile 
    //positive
    it('Should update user address information', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.updateProfileA();
        cy.captureScreenshot();
    });

    //negative 
    it('Should produce error when City is blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profileCityErr();
        cy.captureScreenshot();
    });

    //request loan
    it('Should be able to request loan', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoan();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the entered amount is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN1();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the entered amount left blank', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN2();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the entered amount is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN3();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the entered downpayment is in letters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN4();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the downpayment is left blank ', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN5();
        cy.captureScreenshot();
    });

    //request loan negative
    it('Should show error if the entered downpayment is in special characters', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN6();
        cy.captureScreenshot();
    });
    //logout 
    it('Should logout user', () => {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.logout();
        cy.captureScreenshot();
    })
});


