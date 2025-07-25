import { generateFakeUser } from "../../utils/ParabankUtils";
import '../../support/Commands/Parabank_PayBills';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Pay bills', () => {
    //pay bills
    it('Successful paying bills ', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPayment();
        cy.captureScreenshot(this.test.title);

    });
    //negative 
    it('Unsuccesful pay for typed account number in special characters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN1();
        cy.captureScreenshot(this.test.title);

    });
    //negative 
    it('Unsuccesful pay for typed account number in letters', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN2();
        cy.captureScreenshot(this.test.title);

    });
    //negative 
    it('Unsuccessful pay for all left blank fields', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.billPaymentN3();
        cy.captureScreenshot(this.test.title);

    });
});