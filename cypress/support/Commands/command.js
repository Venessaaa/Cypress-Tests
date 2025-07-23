Cypress.Commands.add('captureScreenshot', () => {
    const now = new Date();
    //   const timestamp = now.toLocaleString('sv-SE', {
    //     timeZone: 'Asia/Manila',
    //     hour12: false, 
    //   }).replace(/[^0-9]/g, '-');  
    const dateOnly = now.toLocaleDateString('sv-SE', {
        timeZone: 'Asia/Manila'
    }).replace(/[^0-9]/g, '-');
    const specPath = Cypress.spec.relative || 'unknown_spec';
    const specBaseName = specPath
        .split(/[\\/]/)
        .pop()                             // Get the filename
        .replace(/\.[^/.]+$/, '')          // Remove file extension
        .replace(/[^a-zA-Z0-9]/g, '_');    // Sanitize to filename-safe
    const filename = `${specBaseName}-${dateOnly}-Jai`;
    cy.screenshot(filename, { capture: 'fullPage' });
});
