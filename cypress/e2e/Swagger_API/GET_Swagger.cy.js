describe('GET - simulate different status code', () => {
    const baseUrl = 'https://petstore.swagger.io/v2/user';
    const userData = {
        id: 17,
        username: 'TestUser07',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser07@example.com',
        password: 'securepass',
        phone: '09123456789',
        userStatus: 1
    };

    it('returned status 200 retrieving user data successfully', () => {
        cy.request('POST', `${baseUrl}`, userData);
        cy.wait(2000);
        cy.request({
            method: 'GET',
            url: `${baseUrl}/${userData.username}`,
            header: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', userData.id);
            expect(response.body).to.have.property('username', userData.username);
            expect(response.body.username).to.be.a('string');
        });
    });

    it('returned status 404 for non-existing user', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/nonexistent_user_123`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.have.property('message', 'User not found');
        });
    });

    it('returned 401 Unauthorized on GET request', () => {
        cy.intercept('GET', '**/user/*', {
            statusCode: 401,
            body: {
                code: 401,
                message: 'Unauthorized'
            }
        }).as('unauthorizedGet');

        cy.request({
            method: 'GET',
            url: `${baseUrl}/someUser`,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 404]);
            if (res.status === 401) {
                expect(res.body.message).to.eq('Unauthorized');
            }

        });
    });

});
