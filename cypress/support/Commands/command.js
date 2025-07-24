Cypress.Commands.add('captureScreenshot', (testTitle) => {
    const now = new Date();
    const dateOnly = now.toLocaleDateString('sv-SE', {
        timeZone: 'Asia/Manila'
    }).replace(/[^0-9]/g, '-');

    const specPath = Cypress.spec.relative || 'unknown_spec';
    const specBaseName = specPath
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9]/g, '_');

    const sanitizedTitle = testTitle
        ? testTitle.replace(/[^a-zA-Z0-9]/g, '_')
        : 'unknownTest';

    const filename = `${specBaseName}-${sanitizedTitle}-${dateOnly}-Jai`;
    cy.screenshot(filename, { capture: 'fullPage' });
});

