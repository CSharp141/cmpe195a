describe('Log In Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.login('user1', 'pw123');
        cy.visit('/account');
        cy.url().should('include', '/account');
    });

    it('title and header', () => {
        cy.title().should('eq', 'Account');
        cy.get('h1').should('contain', 'Account');
    });

    it('access, take and review an exam', () => {
        cy.get('a').contains('Food Safety Certification').click();
        cy.title().should('eq', 'Food Safety Certification');
        cy.get('h1').should('contain', 'Food Safety Certification');

        cy.get('input[type="radio"][value="b. 40°F - 140°F"]').should('exist').first().check().should("be.checked");
        cy.get('input[type="radio"][value="b. E. coli"]').should('exist').first().check().should("be.checked");
        cy.get('button').contains('Submit').click();

        cy.url().should('include', '/review-exam');
        cy.get('input[type="radio"][value="b. 40°F - 140°F"]').should('exist').first().should("be.checked");
        cy.get('input[type="radio"][value="b. E. coli"]').should('exist').first().should("be.checked");
        cy.get('button').contains('Return to Account').click();

        cy.title().should('eq', 'Account');
        cy.get('h1').should('contain', 'Account');
        cy.get('a[href="/review-exam?id=1"]').should('contain', 'Food Safety Certification');
    });

    it('sign out and stay signed out', () => {
        cy.get('a').contains('Sign Out').click();
        cy.url().should('include', '/login');
        cy.title().should('eq', 'Log In');
        
        cy.visit('/account');
        cy.url().should('include', '/login');
        cy.title().should('eq', 'Log In');
    });

});