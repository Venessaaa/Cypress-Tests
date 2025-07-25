import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/Parabank_Updateprof';
import '../../support/Commands/Parabank_Register';
import '../../support/Commands/command';

describe('Update Profile', () => {
    //update profile 
    //positive
    it('Successful update for user address information', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.updateProfileA();
        cy.captureScreenshot(this.test.title);
    });

    //negative 
    it('Unsuccessful update for blank City', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profileCityErr();
        cy.captureScreenshot(this.test.title);
    });

    //negative 
    it('Unsuccessful update for blank State', function () {
        const user = generateFakeUser();
        cy.registerUser(user);
        cy.profilestateErr();
        cy.captureScreenshot(this.test.title);
    });
});