import { circleClass, urlTest } from '../../src/constants/testConstants';

describe('fibonacci works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="fibonacciPage"]').click();
    cy.get('[data-testid="input"]').clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get('[data-testid="input"]').should('contain', '')
    cy.get('[data-testid="calc__button"]').should('be.disabled')
  });

  it('numbers generate correctly', function () {
    const number = '3'
    cy.get('[data-testid="input"]').type(number)
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