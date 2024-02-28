import { circleClass, dataTestidInput, urlTest } from '../../src/constants/testConstants';

describe('list works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="listPage"]').click();
    cy.get(dataTestidInput).clear()

    cy.get(circleClass).as('circle')
  });

  it('button is locked when the input is empty', function () {
    cy.get(dataTestidInput).should('contain', '')
    cy.get('[data-testid="add-tail__button"]').should('be.disabled')
    cy.get('[data-testid="add-head__button"]').should('be.disabled')
    cy.get('[data-testid="add-byindex__button"]').should('be.disabled')
    cy.get('[data-testid="delete-byindex__button"]').should('be.disabled')
  });

  it('rendering of the default list works correctly', function () {
    for (let i = 0; i < 6; i++) {
      cy.get('@circle')
        .eq(i)
        .should('not.be.undefined')
    }
  });

  it('adding an element to the head works correctly', function () {
    const text = '4';
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="add-head__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(0)
      .should('have.text', text)
  });

  it('adding an element to the tail works correctly', function () {
    const text = '4';
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="add-tail__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(6)
      .should('have.text', text)
  });

  it('adding an element by index works correctly', function () {
    const text = '4';
    const textIndex = '3'
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="input-index"]').type(textIndex)
    cy.get('[data-testid="add-byindex__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(+textIndex)
      .should('have.text', text)
  });

  it('removing an element from the head works correctly', function () {
    cy.get('@circle')
      .eq(0)
      .then((circle) => {
        const text = circle.text()
        cy.get('[data-testid="delete-head__button"]').should('not.be.disabled').click()
        cy.wait(1000)
        cy.get('@circle')
          .eq(0)
          .should('not.have.text', text)
      })
  });

  it('removing an element from the tail works correctly', function () {
    cy.get('[data-testid="delete-tail__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(5)
      .should('not.exist')

  });

  it('removing an element by index works correctly', function () {
    const textIndex = '3'
    cy.get('[data-testid="input-index"]').type(textIndex)
    cy.get('@circle')
      .eq(+textIndex)
      .then((circle) => {
        const text = circle.text()
        cy.get('[data-testid="delete-byindex__button"]').should('not.be.disabled').click()
        cy.wait(3000)
        cy.get('@circle')
          .eq(+textIndex)
          .should('not.have.text', text)
      })
  });
})