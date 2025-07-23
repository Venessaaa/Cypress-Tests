import { RegisterPage } from '../pages/RegisterPage';
import { UpdateProfilePage } from '../pages/UpdateProfilePage';
import { generateFakeUser } from '../utils/ParabankUtils';

const registerPage = new RegisterPage();
const updateProfilePage = new UpdateProfilePage();

describe('Parabank POM Tests', () => {

    it('Should register a user successfully', () => {
        const user = generateFakeUser();
        registerPage.visit();
        registerPage.fillRegistrationForm(user);
        registerPage.submit();
    });

    it('Should show error if username already exists', () => {
        const user = generateFakeUser();
        user.username = 'existinguser123';
        registerPage.visit();
        registerPage.fillRegistrationForm(user);
        registerPage.submit();
        registerPage.assertUsernameExistsError();
    });

    //    it('Should show error if First Name is left blank during profile update', () => {
    //         const user = generateFakeUser();
    //         registerPage.visit();
    //         registerPage.fillRegistrationForm(user);
    //         registerPage.submit();

    //         updateProfilePage.visit();
    //         updateProfilePage.updateFirstName({ firstName: user.firstName, address: user.address, city: user.city, state: user.state, zip: user.zipCode });
    //         updateProfilePage.firstNamesubmit();
    //     });

    // it('Should show error if Address is left blank during profile update', () => {
    //     const user = generateFakeUser();
    //     registerPage.visit();
    //     registerPage.fillRegistrationForm(user);
    //     registerPage.submit();
    //     updateProfilePage.visit();
    //     updateProfilePage.updateAddress({ address: user.address, city: user.city, state: user.state, zip: user.zipCode });
    //     updateProfilePage.submitAddress();
    //     updateProfilePage.AddressError();
    // });

    it('Should show error if city is left blank during profile update', () => {
        const user = generateFakeUser();
        registerPage.visit();
        registerPage.fillRegistrationForm(user);
        registerPage.submit();

        updateProfilePage.visit();
        updateProfilePage.updateFields({ address: user.address, city: user.city, state: user.state, zip: user.zipCode });
        updateProfilePage.submit();
        updateProfilePage.assertCityError();
    });
});
