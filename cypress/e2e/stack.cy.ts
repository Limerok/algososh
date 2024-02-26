import { changingColor, urlTest } from '../../src/constants/testConstants';

describe('stack works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="stackPage"]').click();
    cy.get('[data-testid="input"]').clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get('[data-testid="input"]').should('contain', '')
    cy.get('[data-testid="add__button"]').should('be.disabled')
  });

  it('element adds correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('div[class*="circle_head"]')
      .eq(1)
      .contains('top')
  });

  it('element delete correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('div[class*="circle_head"]')
      .eq(1)
      .contains('top')

    cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', newtext)
      .should('have.css', 'border-color', changingColor)

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('not.exist')


    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')
  })

  it('cleaning works correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('div[class*="circle_head"]')
      .eq(1)
      .contains('top')

    cy.get('[data-testid="clean__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle"]')
      .should('not.exist')
  });
})