import { wait } from '@testing-library/user-event/dist/utils';
import { urlTest } from '../../src/constants/testConstants';

describe('list works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="listPage"]').click();
    cy.get('[data-testid="input"]').clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get('[data-testid="input"]').should('contain', '')
    cy.get('[data-testid="add-tail__button"]').should('be.disabled')
    cy.get('[data-testid="add-head__button"]').should('be.disabled')
    cy.get('[data-testid="add-byindex__button"]').should('be.disabled')
    cy.get('[data-testid="delete-byindex__button"]').should('be.disabled')
  });

  it('rendering of the default list works correctly', function () {
    for (let i = 0; i < 6; i++) {
      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should('not.be.undefined')
    }
  });

  it('adding an element to the head works correctly', function () {
    const text = '4';
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="add-head__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
  });

  it('adding an element to the tail works correctly', function () {
    const text = '4';
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="add-tail__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(6)
      .should('have.text', '4')
  });

  it('adding an element by index works correctly', function () {
    const text = '4';
    const textIndex = '3'
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="input-index"]').type(textIndex)
    cy.get('[data-testid="add-byindex__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .should('have.text', '4')
  });

  it('removing an element from the head works correctly', function () {

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .then((circle) => {
        const text = circle.text()
        cy.get('[data-testid="delete-head__button"]').should('not.be.disabled').click()
        cy.wait(1000)
        cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('not.have.text', text)
      })
  });

  it('removing an element from the tail works correctly', function () {
    cy.get('[data-testid="delete-tail__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(5)
      .should('not.exist')

  });

  it('removing an element by index works correctly', function () {
    const textIndex = '3'
    cy.get('[data-testid="input-index"]').type(textIndex)
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .then((circle) => {
        const text = circle.text()
        cy.get('[data-testid="delete-byindex__button"]').should('not.be.disabled').click()
        cy.wait(3000)
        cy.get('div[class*="circle_circle"]')
          .eq(3)
          .should('not.have.text', text)
      })

  });

})