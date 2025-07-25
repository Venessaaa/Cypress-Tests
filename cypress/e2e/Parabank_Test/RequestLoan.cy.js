import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/Parabank_ReqLoan';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Request loan', () => {
    //request loan
    it('Successful request loan', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoan();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for entered amount in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN1();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for blank amount', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN2();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for entered amount in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN3();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for entered downpayment in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN4();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for entered blank downpayment ', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN5();
        cy.captureScreenshot(this.test.title);

    });

    //request loan negative
    it('Unsuccessful reuqest loan for entered downpayment in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.requestLoanN6();
        cy.captureScreenshot(this.test.title);

    });
});