describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('title and header', () => {
        cy.title().should('eq', 'Home Page');
        cy.get('h1').should('contain', 'Home Page');
    });

});