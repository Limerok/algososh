import { changingColor, modifiedColor, urlTest } from '../../src/constants/testConstants';

describe('string works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="stringComponent"]').click();
    cy.get('[data-testid="input"]').clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get('[data-testid="input"]').should('contain', '')
    cy.get('[data-testid="reverse_button"]').should('be.disabled')
  });

  it('string reverse correctly', function () {
    const text = 'test'
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="reverse_button"]').should('not.be.disabled').click()
    for (let i = 0; i < text.length / 2; i++) {
      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should('have.css', 'border-color', changingColor)

      cy.get('div[class*="circle_circle"]')
        .eq(text.length - 1 - i)
        .should('have.css', 'border-color', changingColor)

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should('have.css', 'border-color', modifiedColor)

      cy.get('div[class*="circle_circle"]')
        .eq(text.length - 1 - i)
        .should('have.css', 'border-color', modifiedColor)
    }
  });

});