import { faker } from '@faker-js/faker';

export function generateFakeUser(overrides = {}) {
  const password = faker.internet.password({ length: 10 });

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number('###-###-####'),
    ssn: faker.helpers.replaceSymbols('###-##-####'),
    username: faker.internet.username().toLowerCase(),
    password: password,
    repeatedPassword: password,
  };
}
export function fillRegistrationForm(user) {
  cy.visit('https://parabank.parasoft.com/parabank/register.htm'); // Ensure you're on the form page
  cy.get('form').should('be.visible');
  cy.get('input[name="customer.firstName"]').type(user.firstName);
  cy.get('input[name="customer.lastName"]').type(user.lastName);
  cy.get('input[name="customer.address.street"]').type(user.address);
  cy.get('input[name="customer.address.city"]').type(user.city);
  cy.get('input[name="customer.address.state"]').type(user.state);
  cy.get('input[name="customer.address.zipCode"]').type(user.zipCode);
  cy.get('input[name="customer.phoneNumber"]').type(user.phoneNumber);
  cy.get('input[name="customer.ssn"]').type(user.ssn);
  cy.get('input[name="customer.username"]').type(user.username);
  cy.get('input[name="customer.password"]').type(user.password);
  cy.get('input[name="repeatedPassword"]').type(user.repeatedPassword);
}
const stateZipRanges = {
  'CA': [90001, 96162],
  'NY': [10001, 14925],
  'TX': [75001, 88595],
  'FL': [32003, 34997],
  'IL': [60001, 62999],
  // Add more as needed
};

// Utility function to return matching state and ZIP
export function getRandomStateWithZip() {
  const states = Object.keys(stateZipRanges);
  const state = faker.helpers.arrayElement(states);
  const [min, max] = stateZipRanges[state];
  const zipCode = faker.number.int({ min, max });
  return { state, zipCode: zipCode.toString() };
}
