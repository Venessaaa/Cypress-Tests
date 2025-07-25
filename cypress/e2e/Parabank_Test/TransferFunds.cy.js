import { generateFakeUser } from "../../utils/ParabankUtils";
import '../../support/Commands/Parabank_OpenAcct';
import '../../support/Commands/Parabank_Transfer';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Transfer funds to another account', () => {
    //transfer funds
    it('Successful transfer to another account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFunds();
        cy.captureScreenshot(this.test.title);
    });

    //transfer funds - negative 
    it('Unsuccessful transfer for blank amount field', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN();
        cy.captureScreenshot(this.test.title);
    });

    //transfer funds - negative 2
    it('Unsuccesful transfer for inputted letters in amount field', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN2();
        cy.captureScreenshot(this.test.title);

    });

    //transfer funds - negative 3
    it('Unsuccesful transfer for inputted special characters in amount field', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.transferFundsN3();
        cy.captureScreenshot(this.test.title);

    });
});