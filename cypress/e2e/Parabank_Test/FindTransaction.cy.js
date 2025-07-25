import { generateFakeUser } from "../../utils/ParabankUtils";
import '../../support/Commands/Parabank_FindTransac';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';
describe('Find transactions', () => {

    //find transactions - not working on website
    // it.only('Should be able to search transactions using transaction ID', () => {
    //     const user = generateFakeUser();
    //     cy.registerUser(user);
    //     // cy.fixtureAccount();
    //     cy.findTransactionID();
    // });

    //find transaction by amount
    it('Successful search using amount', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionAmount();
        cy.captureScreenshot(this.test.title);

    });
    //find transaction by amount - negative 
    it('Unsuccesful/error search for blank amount field', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN1();
        cy.captureScreenshot(this.test.title);

    });
    //find transaction by amount - negative 
    it('Unsuccessful/error search for amount in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionAmountN2();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using date range 
    it.only('Successful search using Date range', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateRange();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it('Unsuccessful/error search for two dates that are empty', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN1();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it('Unsuccessful/error search for one date range that is empty', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN2();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it('Unsuccessful/error search for one date range in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN3();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction date is empty 
    it('Unsuccessful/error search for one date range in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.findTransactionDateRangeN4();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using random date
    it('Successful search using Date', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDate();
        cy.captureScreenshot(this.test.title);

    });

    //find transaction using date today
    it('Successful search using Date', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.fixtureAccount();
        cy.findTransactionDateToday();
        cy.captureScreenshot(this.test.title);

    });
});