// accounts overview 
Cypress.Commands.add('accountOverview', () => {
    cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
    cy.get('table tbody tr').each(($row) => {
        const $cells = $row.find('td');

        // Skip row if it's the "Total" row
        if (Cypress.$($cells[0]).text().trim().toLowerCase().includes('total')) {
            return;
        }

        const accountNumber = Cypress.$($cells[0]).text().trim();
        const balance = Cypress.$($cells[1]).text().trim();
        const available = Cypress.$($cells[2]).text().trim();

        expect(accountNumber).to.match(/^\d+$/);
        expect(balance).to.include('$');
        expect(available).to.include('$');
    });
});
