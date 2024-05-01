describe('Log In Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('title and header', () => {
        cy.title().should('eq', 'Log In');
        cy.get('h1').should('contain', 'Log In');
    });

    it('login form', () => {
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button').contains('Submit').should('exist');
    });

    it('registration', () => {
        cy.get('a').contains('New user?').should('exist').click();
        cy.title().should('eq', 'Sign Up');
        cy.get('h1').should('contain', 'Sign Up');
    });

    it('submits form successfully with correct credentials', () => {
        cy.login('user1', 'pw123');

        cy.url().should('include', '/account');
    });


});