import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/Parabank_Overview';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/Parabank_OpenAcct';
import '../../support/Commands/command';

describe('Overview created account/s', () => {
    //overview account 
    it('Successful viewing of all created account', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.openAccount();
        cy.accountOverview();
        cy.captureScreenshot(this.test.title);
    });
});

