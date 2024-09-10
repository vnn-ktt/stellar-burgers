describe('Checks order burger', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'orderBurger'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refresh-token')
    );
    cy.setCookie('accessToken', 'test-access-token');
    cy.visit('http://localhost:4000/');

    cy.get('[data-cy=ingredient]')
      .contains('Bun 1')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=ingredient]')
      .contains('Main 1')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=order-button]').click();
  });
  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Checks post with correct data', () => {
    cy.wait('@orderBurger')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['3', '1']
      });
  });

  it('Checks modal order window', () => {
    cy.get('[data-cy=modal]').contains('123').should('be.visible');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Checks clearing burger constructor', () => {
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').find('li').should('not.exist');
    cy.get('[data-cy=constructor-bun-bottom]').should('not.exist');
  });
});
