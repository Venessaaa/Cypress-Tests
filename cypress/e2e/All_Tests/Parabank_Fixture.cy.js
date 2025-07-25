describe('Parabank Registration', () => {
  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  });

  it('should register a new user successfully', () => {
    cy.fixture('parabankfixtures').then(user => {
      const randomUsername = `user_${Date.now()}`;

      cy.get('input[name="customer.firstName"]').type(user.FirstName);
      cy.get('input[name="customer.lastName"]').type(user.LastName);
      cy.get('input[name="customer.address.street"]').type(user.Address);
      cy.get('input[name="customer.address.city"]').type(user.City);
      cy.get('input[name="customer.address.state"]').type(user.State);
      cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
      cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
      cy.get('input[name="customer.ssn"]').type(user.ssn);
      cy.get('input[name="customer.username"]').type(randomUsername); // dynamic username
      cy.get('input[name="customer.password"]').type(user.Password);
      cy.get('input[name="repeatedPassword"]').type(user.Confirm);
      cy.get('input[value="Register"]').click();

      cy.contains('Welcome').should('be.visible');
    });
  });

  it('Should produce error Usernname already exist', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm'); // ⬅ ensure fresh page
    cy.fixture('parabankfixtures').then(user => {
      user.Username = 'existinguser123'; // simulate duplicate

      cy.get('input[name="customer.firstName"]').type(user.FirstName);
      cy.get('input[name="customer.lastName"]').type(user.LastName);
      cy.get('input[name="customer.address.street"]').type(user.Address);
      cy.get('input[name="customer.address.city"]').type(user.City);
      cy.get('input[name="customer.address.state"]').type(user.State);
      cy.get('input[name="customer.address.zipCode"]').type(user.ZipCode);
      cy.get('input[name="customer.phoneNumber"]').type(user.PhoneNumber);
      cy.get('input[name="customer.ssn"]').type(user.ssn);
      cy.get('input[name="customer.username"]').type(user.Username);
      cy.get('input[name="customer.password"]').type(user.Password);
      cy.get('input[name="repeatedPassword"]').type(user.Confirm);
      cy.get('input[value="Register"]').click();
    });
  });
});
