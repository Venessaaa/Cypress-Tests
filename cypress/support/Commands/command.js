Cypress.Commands.add('captureScreenshot', (testTitle) => {
    const now = new Date();
    const dateOnly = now.toLocaleDateString('sv-SE', {
        timeZone: 'Asia/Manila'
    }).replace(/[^0-9]/g, '-');

    // Get the spec path
    const specPath = Cypress.spec.relative || 'unknown_spec';

    // Extract folder name from the spec file (e.g., "register" from "register.cy.js")
    const fileName = specPath
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, ''); // remove file extension

    const sanitizedTitle = testTitle
        ? testTitle.replace(/[^a-zA-Z0-9]/g, '_')
        : 'unknownTest';

    const screenshotPath = `${fileName}/${sanitizedTitle}-${dateOnly}-Jai`;

    cy.screenshot(screenshotPath, { capture: 'fullPage' });
});
