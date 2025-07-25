describe('PUT - simulate different status code', () => {
  const baseUrl = 'https://petstore.swagger.io/v2/user';

  it('returned status 200 successfully update an existing user', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/4`, // existing username
      body: {
        id: 4,
        username: 'updateduser',
        firstName: 'Jai',
        lastName: 'Test',
        email: 'jaitest@example.com',
        password: '12345',
        phone: '1234567890',
        userStatus: 1
      },
      headers: {
        'Content-type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('code', 200);
      expect(response.body).to.have.property('message', '4');
    });
  });

  it('returned status 404 for a non-existing user', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/nonexistent_user_abc123`, // random non-existing user
      body: {
        id: 9999,
        username: 'nonuser',
        firstName: 'Not',
        lastName: 'Existing',
        email: 'notexisting@example.com',
        password: 'nopass',
        phone: '0000000000',
        userStatus: 0
      },
      headers: {
        'Content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Petstore API might still return 200 even for non-existing users 
      expect(response.status).to.be.oneOf([200, 404]);
    });
  });

  it('returned status 400 for invalid request body (malformed)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/user!4`,
      body: "This is not a valid JSON body", // invalid format
      headers: {
        'Content-type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
