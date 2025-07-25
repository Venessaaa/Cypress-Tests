import { generateFakeUser } from '../../utils/ParabankUtils';
import '../../support/Commands/command';

describe('Parabank Signin', () => {
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
    cy.captureScreenshot();

  })
});

