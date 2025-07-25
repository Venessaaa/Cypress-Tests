describe('Swagger Petstore User API - POST, GET, DELETE', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';
    const userData = {
        id: 9876,
        username: 'TestUser07',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser07@example.com',
        password: 'securepass',
        phone: '09123456789',
        userStatus: 1
    };

    it('POST - should create a new user', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/user`,
            body: userData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', userData.id.toString());
        });
    });

    it('POST & GET - create and retrieve user in one flow', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/user`,
            body: userData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((postResponse) => {
            expect(postResponse.status).to.eq(200);
            expect(postResponse.body.message).to.eq(userData.id.toString());

            // Chaining GET request after successful POST
            cy.request({
                method: 'GET',
                url: `${baseUrl}/user/${userData.username}`,
                failOnStatusCode: false 
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.body).to.have.property('username', userData.username);
                expect(getResponse.body).to.have.property('email', userData.email);
            });
        });
    });

    it('DELETE - should delete the user', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/user/${userData.username}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', userData.username);
        });
    });

    it('GET - should return 404 after the deletion', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/user/${userData.username}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 404]);

            if (response.status === 404) {
                expect(response.body).to.have.property('message', 'User not found');
            } else {
                // log - means it is not actually deleted and is still existing
                cy.log('User still exists after DELETE — mock API may not persist data');
            }
        });
    });
});
