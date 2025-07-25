import { generateFakeUser } from '../../utils/ParabankUtils';
import { } from '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Logout user', () => {
    //logout 
    it('Successful logout', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.logout();
        cy.captureScreenshot(this.test.title);
    });
});