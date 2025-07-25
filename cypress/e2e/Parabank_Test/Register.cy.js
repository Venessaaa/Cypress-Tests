import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';


describe('Register User', () => {
    //register
    it('Successful registration', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.captureScreenshot(this.test.title);
    });

    //register with empty fields from first name to SSN
    it('Unsuccessful regristration for empty fields from first name to SSN', function () {
        const user = generateFakeUser();
        cy.registerUserN1(user);
        cy.captureScreenshot(this.test.title);
    });

    //registering with existing username
    it('Unsuccessful regristration with using an existing username', function () {
        cy.registerWExisting();
        cy.captureScreenshot(this.test.title);
    });
});