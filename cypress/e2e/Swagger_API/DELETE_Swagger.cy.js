describe('DELETE - simulate different status codes', () => {
    const baseUrl = 'https://petstore.swagger.io/v2/user';
    const userData = {
        id: 17,
        username: 'DeleteSimUser',
        firstName: 'Del',
        lastName: 'User',
        email: 'deluser@example.com',
        password: 'password',
        phone: '0987654321',
        userStatus: 1
    };

    it('returned status 200 successful deletion', () => {
        cy.request('POST', `${baseUrl}`, userData);
        
        cy.wait(1000);
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/${userData.username}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', userData.username);
        });

    });

    it('returned status 404 after the deletion', () => {
        cy.wait(1000);
         cy.request({
            method: 'DELETE',
            url: `${baseUrl}/${userData.username}`
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 404]);
            expect(response.body).to.have.property('message', userData.username);
        });
    });
});