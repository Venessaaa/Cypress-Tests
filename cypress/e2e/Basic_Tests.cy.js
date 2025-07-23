describe ('My First Test', () => {
it('Test Website', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/')    
  cy.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')    
  cy.title().should('eq', "OrangeHRM")
  cy.get('.orangehrm-login-branding > img')
    .should('be.visible')
  cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
  .should('be.visible')
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    .should('be.visible')
  cy.contains('Password').should('contain', 'Password')
  cy.get('.oxd-button')
    .should('be.visible')
    .should('contain', 'Login')

  })
it('Negative Test Website', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/')
  cy.title().should('eq', 'OrangeHRM1') 
  cy.get('.orangehrm-login-branding > img')
    .should('not.be.visible')
  cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    .should('not.be.visible')
  cy.get('.oxd-button')
    .should('not.be.visible')

})
})