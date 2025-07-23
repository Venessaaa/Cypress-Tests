
describe ('My First Test', () => {
    it('Test 1', () => {
        cy.visit("https://www.saucedemo.com/v1/")
        cy.title().should('eq', 'Swag Labs')
    })
    it('Test2', () => {
        cy.visit('https://www.saucedemo.com/v1/')
        cy.title().should('eq' , "Swag Labs")
    })

})
