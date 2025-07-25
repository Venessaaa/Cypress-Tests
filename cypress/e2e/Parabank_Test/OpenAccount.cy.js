import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/Parabank_OpenAcct';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Open new account', () => {
    //Open new account    
    it('Successful account opening ', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.captureScreenshot(this.test.title);
    });

    //Open new account    
    it('Successful viewing of newly open account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.captureScreenshot(this.test.title);

    });

    //view transaction on account activity 
    it('Successful viewing of account transaction', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.reviewNewAccountInfo();
        cy.filterTransactions();
        cy.captureScreenshot(this.test.title);
    });
});