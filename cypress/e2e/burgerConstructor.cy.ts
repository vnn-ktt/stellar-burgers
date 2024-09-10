describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Checks loading ingredients from API', () => {
    cy.get('[data-cy=ingredient]').should('have.length', 3);
  });

  it('Checks adding a bun to the constructor', () => {
    addIngredientToConstructor('Bun 1');
    verifyIngredientInConstructor('Bun 1');
    verifyTotalPrice(100); // Цена булки умноженная на 2
  });

  it('Checks adding a main ingredient to the constructor', () => {
    addIngredientToConstructor('Main 1');
    verifyIngredientInConstructor('Main 1');
    verifyTotalPrice(70);
  });

  it('Checks adding both a bun and a main ingredient to the constructor', () => {
    addIngredientToConstructor('Bun 1');
    addIngredientToConstructor('Main 1');
    verifyIngredientInConstructor('Bun 1');
    verifyIngredientInConstructor('Main 1');
    verifyTotalPrice(170); // 100 за булку и 70 за ингредиент
  });

  function addIngredientToConstructor(ingredientName) {
    cy.get('[data-cy=ingredient]')
      .contains(ingredientName)
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
  }

  function verifyIngredientInConstructor(ingredientName) {
    cy.get('[data-cy=burger-constructor]')
      .contains(ingredientName)
      .should('exist');
  }

  function verifyTotalPrice(expectedPrice) {
    cy.get('[data-cy=total-price]').should('contain', expectedPrice);
  }
});
