describe('Modal Window Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Checks opening ingredient modal', () => {
    cy.get('[data-cy=ingredient]').contains('Bun 1').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-title]').should('contain', 'Детали ингредиента');
    cy.get('[data-cy=modal]').contains('Bun 1').should('be.visible');
  });

  it('Checks closing modal with (X)', () => {
    cy.get('[data-cy=ingredient]').contains('Bun 1').click();
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Checks closing modal with the overlay', () => {
    cy.get('[data-cy=ingredient]').contains('Bun 1').click();
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
