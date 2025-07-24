
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
    it('Register - Should register a user successfully', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.captureScreenshot(this.test.title);
    });

    //register with empty fields from first name to SSN
    it('Register - Should show errors if fields from first name to SSN are blank', function () {
        const user = generateFakeUser();
        cy.registerUserN1(user);
        cy.captureScreenshot(this.test.title);
    });

    //registering with existing username
    it('Register - should show an error when trying to register using an existing username', function () {
        cy.registerWExisting();
        cy.captureScreenshot(this.test.title);
    });

    //Open new account    
    it('Open Account - Should let the user open new account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.captureScreenshot(this.test.title);
    });

    //Open new account    
    it('Open Account - Should let the user view the information on the newly created account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.captureScreenshot(this.test.title);

    });

    //view transaction on account activity 
    it('Account Activity - Should let the user see the transaction on the Account Activity ', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.filterTransactions();
        cy.captureScreenshot(this.test.title);
    });

    //overview account 
    it('Account Overview - Should reflect all of the created account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.accountOverview();
        cy.captureScreenshot(this.test.title);
    });

    //transfer funds
    it('Transfer funds - Should be able to transfer funds to another account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFunds();
        cy.captureScreenshot(this.test.title);
    });

    //transfer funds - negative 
    it('Transfer funds - Should show error message if amount field is left blank', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN();
        cy.captureScreenshot(this.test.title);
    });

    //transfer funds - negative 2
    it('Transfer funds - Should show error message if entered amount is letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN2();
        cy.captureScreenshot(this.test.title);

    });

    //transfer funds - negative 3
    it('Transfer funds - Should show error message if entered amount is special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN3();
        cy.captureScreenshot(this.test.title);

    });

    //pay bills
    it('Bill pay - Should let the user pay bills', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPayment();
        cy.captureScreenshot(this.test.title);

    });
    //negative 
    it('Bill pay - Should show error if the account number is in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN1();
        cy.captureScreenshot(this.test.title);

    });
    //negative 
    it('Bill pay - Should show error if typed Account number is in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN2();
        cy.captureScreenshot(this.test.title);

    });
    //negative
    it('Bill pay - Should show error if all fields are left blank', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN3();
        cy.captureScreenshot(this.test.title);

    });

    //find transactions - not working on website
    // it.only('Should be able to search transactions using transaction ID', () => {
    //     const user = generateFakeUser();
    //     cy.registerUser(user);
    //     // cy.fixtureAccount();
    //     cy.findTransactionID();
    // });

    //find transaction by amount
    it.only('Find Transaction - Should be able to search transactions using Amount', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionAmount();
        cy.captureScreenshot(this.test.title);

    });
    //find transaction by amount - negative 
    it.only('Find transaction - Should show error if amount is empty', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN1();
        cy.captureScreenshot(this.test.title);

    });
    //find transaction by amount - negative 
    it.only('Find transaction - Should show error if amount is in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN2();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using date range 
    it.only('Find transaction - Should be able to search transactions using Date range', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateRange();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it.only('Find transaction - Should show error if two dates are empty', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN1();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it.only('Find transaction - Should show error if one date range is empty', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN2();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it.only('Find Transaction - Should show error if one date range is in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN3();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it.only('Find transaction - Should show error if one date range is in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN4();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using random date
    it.only('Find transaction - Should be able to search transactions using Date', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDate();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using date today
    it.only('Find Transaction - Should be able to search transactions using Date', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateToday();
        cy.captureScreenshot(this.test.title);

    });

    //update profile 
    //positive
    it.only('Update profile - Should update user address information', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.updateProfileA();
        cy.captureScreenshot(this.test.title);

    });

    //negative 
    it.only('Update profile - Should produce error when City is blank', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profileCityErr();
        cy.captureScreenshot(this.test.title);

    });

    //request loan
    it.only('Request loan - Should be able to request loan', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoan();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Request loan - Should show error if the entered amount is in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN1();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Request loan - Should show error if the entered amount left blank', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN2();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Request loan - Should show error if the entered amount is in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN3();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Request loan - Should show error if the entered downpayment is in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN4();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Request loan - Should show error if the downpayment is left blank ', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN5();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it.only('Reuqest loan - Should show error if the entered downpayment is in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN6();
        cy.captureScreenshot(this.test.title);

    });
    //logout 
    it.only('logout - Should logout user', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.logout();
        cy.captureScreenshot(this.test.title);

    })
});


