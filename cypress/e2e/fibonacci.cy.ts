import { circleClass, dataTestidInput, urlTest } from '../../src/constants/testConstants';

describe('fibonacci works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="fibonacciPage"]').click();
    cy.get(dataTestidInput).clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get(dataTestidInput).should('contain', '')
    cy.get('[data-testid="calc__button"]').should('be.disabled')
  });

  it('numbers generate correctly', function () {
    const number = '3'
    cy.get(dataTestidInput).type(number)
    cy.get('[data-testid="calc__button"]').should('not.be.disabled').click()
    cy.get(circleClass).as('circle')
    cy.get('@circle')
      .eq(0)
      .should('have.text', '1')

    cy.get('@circle')
      .eq(1)
      .should('have.text', '1')

    cy.get('@circle')
      .eq(2)
      .should('have.text', '2')

    cy.get('@circle')
      .eq(3)
      .should('have.text', '3')
  });
})