import type {} from 'cypress';

const url = 'http://localhost:4000';
const modal = '[data-cy="modal"]';

beforeEach(() => {
  window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
  cy.setCookie('accessToken', '?C524-=cAWz5-2vF=bHYXkGV63P9');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  cy.visit(url);
  cy.viewport('macbook-15');
});

afterEach(function () {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Тест для конструктора бургера', function () {
  it('Тест возможности добавления ингредиентов в конструктор бургеров', () => {
    cy.get('[data-cy="constructor-item"]').should('not.exist');
    cy.get('[data-cy="ingredient-type-bun"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').should('be.visible');
    cy.get('[data-cy="constructor-bun-1"]').contains('верх').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').should('be.visible');
    cy.get('[data-cy="constructor-bun-2"]').contains('низ').should('exist');

    cy.get('[data-cy="constructor-item"]').should('not.exist');
    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-item"]').should('be.visible');
    cy.get('[data-cy="constructor-item"]')
      .contains('Биокотлета')
      .should('exist');

    cy.get('[data-cy="constructor-item"]').contains('Соус').should('not.exist');
    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-item"]').should('be.visible');
    cy.get('[data-cy="constructor-item"]').contains('Соус').should('exist');
  });

  it('Тест корректности работы модальных окон', () => {
    cy.get(modal).should('not.exist');
    cy.get('[data-id="ingredient-id-1"]').click();
    cy.get(modal).should('be.visible');
    cy.get(modal).contains('Краторная булка').should('exist');
    cy.get('[data-cy="modal-close"]').click();
    cy.get(modal).should('not.exist');
    cy.get('[data-id="ingredient-id-1"]').click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(modal).should('not.exist');
  });

  it('Тест функционала оформления заказа', () => {
    cy.get('[data-cy="ingredient-type-bun"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="order-button"]').click();
    cy.get(modal).contains('51539').should('exist');
    cy.get('[data-cy="modal-close"]').click();
    cy.get(modal).should('not.exist');
    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Выберите начинку')
      .should('exist');
  });
});
