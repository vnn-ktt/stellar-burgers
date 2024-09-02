describe('Checks order burger', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
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

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('order post with correct data', () => {
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['3', '1']
      }); // Тестируем, что в тело запроса уходит массив с теми ингредиентам, которые были добавлены в конструктор
  });

  //   it('modal window', () => {
  //    cy.wait('@postOrder')
  //    .its('response.body.number')
  //    .then((orderNumber) => {
  //      cy.get('[data-cy=modal]').should('be.visible');
  //      cy.get('[data-cy=modal-title]').should('contain', orderNumber);
  //    });

  //  cy.get('[data-cy=modal-close]').click();
  //  cy.get('[data-cy=modal]').should('not.exist');
  //  cy.get('[data-cy=burger-constructor]').children().should('have.length', 0);
  //   });

  //   it('order modal worcks correctly', () => {
  //     cy.get(modal).contains('1234').should('exist'); // Проверяем, что модальное окно отображает корректные данные

  //     cy.get(modalCloseButton).click(); // Находим кнопу для закрытия модального окна
  //     cy.get(modal) // Проверяем, что модальное окно было закрыто и больше не отображается на странице
  //       .should('not.exist');
  //   });

  //   it('burger constructor should be clean after order success', () => {
  //     cy.get(modalOverlay).click({ force: true });

  //     cy.get(ingredientsList).find('li').should('not.exist'); // Проверяем, что список ингридиентов очищен

  //     cy.get(constructorBunTop).should('not.exist'); // Проверям, что верхняя секция под булку очищена

  //     cy.get(constructorBunBottom).should('not.exist'); // Проверяем, что нижняя секция под булку очищена
  //   });
});

// it('Checks creating an order', () => {
//  cy.get('[data-cy=ingredient]')
//    .contains('Bun 1')
//    .parent()
//    .find('button')
//    .contains('Добавить')
//    .click();

//  cy.get('[data-cy=ingredient]')
//    .contains('Main 1')
//    .parent()
//    .find('button')
//    .contains('Добавить')
//    .click();

//  cy.get('[data-cy=order-button]').click();

//  cy.wait('@createOrder')
//    .its('response.body.number')
//    .then((orderNumber) => {
//      cy.get('[data-cy=modal]').should('be.visible');
//      cy.get('[data-cy=modal-title]').should('contain', orderNumber);
//    });

//  cy.get('[data-cy=modal-close]').click();
//  cy.get('[data-cy=modal]').should('not.exist');
//  cy.get('[data-cy=burger-constructor]').children().should('have.length', 0);
// });
