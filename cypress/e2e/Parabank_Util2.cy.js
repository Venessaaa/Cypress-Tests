import { generateFakeUser } from '../utils/ParabankUtils';
import { fillRegistrationForm } from '../utils/ParabankUtils';

describe('Parabank Registration', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  });

  it('should register with dynamic data using faker', () => {
    const user = generateFakeUser()
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
    cy.get('input[name="repeatedPassword"]').type(user.password);
    cy.get('input[value="Register"]').click();
    cy.url().should('include', 'https://parabank.parasoft.com/parabank/register.htm');
  })

  // it('should not allow registration with empty username', () => {
  //   cy.fixture('parabankfixtures').as('user')
  //   user.username = '';
  //   cy.get('input[value="Register"]').click();
  //   cy.contains('Username is required').should('be.visible'); 
  // });

  // it('should not allow registration with mismatched passwords', () => {
  //   const user = generateFakeUser();
  //   user.repeatedPassword = faker.internet.password(); 

  //   fillRegistrationForm(user);
  //   cy.get('input[value="Register"]').click();

  //   cy.url().should('include', '/register.htm');
  //   cy.contains('Passwords did not match').should('be.visible'); 
  // });

  it('should not allow registration with non-numeric zip code', () => {
    const user = generateFakeUser();
    user.zipCode = 'ABCDE';

    fillRegistrationForm(user);
    cy.get('input[value="Register"]').click();
    cy.url().should('include', '/register.htm');
  });

  it('should not allow registration with invalid SSN (too short)', () => {
    const user = generateFakeUser();
    user.ssn = '123';
    fillRegistrationForm(user);
    cy.get('input[value="Register"]').click();
    cy.url().should('include', '/register.htm');
    cy.contains('SSN').should('be.visible');
  });

  it('should not allow registration with already taken username', () => {
    const user = generateFakeUser();
    user.username = 'existinguser123';

    fillRegistrationForm(user);
    cy.get('input[value="Register"]').click();

    cy.url().should('include', '/register.htm');
    cy.contains('This username already exists').should('be.visible');
  });
});

