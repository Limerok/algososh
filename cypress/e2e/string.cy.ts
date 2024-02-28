import { circleClass, dataTestidInput, urlTest } from '../../src/constants/testConstants';
import { changingColor, modifiedColor } from '../../src/constants/testConstants';

describe('string works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="stringComponent"]').click();
    cy.get(dataTestidInput).clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get(dataTestidInput).should('contain', '')
    cy.get('[data-testid="reverse_button"]').should('be.disabled')
  });

  it('even length string reverse correctly', function () {
    const text = 'test'
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="reverse_button"]').should('not.be.disabled').click()

    cy.get(circleClass).as('circle')

    for (let i = 0; i < text.length / 2; i++) {
      cy.get('@circle')
        .eq(i)
        .should('have.css', 'border-color', changingColor)

      cy.get('@circle')
        .eq(text.length - 1 - i)
        .should('have.css', 'border-color', changingColor)

      cy.wait(100);

      cy.get('@circle')
        .eq(i)
        .should('have.css', 'border-color', modifiedColor)

      cy.get('@circle')
        .eq(text.length - 1 - i)
        .should('have.css', 'border-color', modifiedColor)
    }
  });

  it('odd length string reverse correctly', function () {
    const text = '12345'
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="reverse_button"]').should('not.be.disabled').click()

    cy.get(circleClass).as('circle')

    for (let i = 0; i < text.length / 2; i++) {
      if (i !== text.length - i - 1) {
        cy.get('@circle')
          .eq(i)
          .should('have.css', 'border-color', changingColor)

        cy.get('@circle')
          .eq(text.length - 1 - i)
          .should('have.css', 'border-color', changingColor)

        cy.wait(100);

        cy.get('@circle')
          .eq(i)
          .should('have.css', 'border-color', modifiedColor)

        cy.get('@circle')
          .eq(text.length - 1 - i)
          .should('have.css', 'border-color', modifiedColor)
      } else {
        cy.get('@circle')
          .eq(i)
          .should('have.css', 'border-color', modifiedColor)
      }
    }
  });

  it('single element string reverse correctly', function () {
    const text = '1'
    cy.get(dataTestidInput).type(text)
    cy.get('[data-testid="reverse_button"]').should('not.be.disabled').click()

    cy.get(circleClass).as('circle')

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border-color', modifiedColor)
  });
});