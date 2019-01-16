describe('WAI ARIA Spec', function() {
    beforeEach(() => {
        cy.visit('cypress/index.html');
    });

    it('Loads the Cypress Testing Sandbox', function() {
        cy.title().should(
            'eq',
            'React Accessible Accordion - Cypress Testing Sandbox',
        );
    });
});
