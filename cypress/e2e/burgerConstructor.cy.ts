describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
  });

  it('Checks loading ingredients from API', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy=ingredient]').should('have.length', 3);
  });

  it('Checks adding a bun to the constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy=ingredient]').contains('Bun 1').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]').contains('Bun 1').should('exist');
    cy.get('[data-cy=total-price]').should('contain', '100'); // Цена булки умноженная на 2
  });

  it('Checks adding an ingredient (main or sauce) to the constructor', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy=ingredient]').contains('Main 1').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor]').contains('Main 1').should('exist');
    cy.get('[data-cy=total-price]').should('contain', '70');
  });

  it('Checks adding both a bun and a main ingredient to the constructor', () => {
    cy.wait('@getIngredients');

    cy.get('[data-cy=ingredient]').contains('Bun 1').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=ingredient]').contains('Main 1').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor]').contains('Bun 1').should('exist');
    cy.get('[data-cy=constructor]').contains('Main 1').should('exist');
    cy.get('[data-cy=total-price]').should('contain', '170'); // 100 за булку и 70 за начинки
  });
});
