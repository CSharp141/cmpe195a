describe('Resources Page', () => {
    beforeEach(() => {
        cy.visit('/resources');
    });

    it('title and header', () => {
        cy.title().should('eq', 'Resources');
        cy.get('h1').should('contain', 'Resources');
    });

});