import { urlTest } from '../../src/constants/testConstants';

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
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.get('[data-testid="input"]').type(newtext)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

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
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.get('[data-testid="input"]').type(newtext)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

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
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('not.exist')


    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')
  })



  it('cleaning works correctly', function () {
    const text = '4';
    cy.get('[data-testid="input"]').type(text)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should('have.text', '4')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

    cy.get('div[class*="circle_head"]')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.get('[data-testid="input"]').type(newtext)
    cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')

    cy.wait(100);

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should('have.text', '1')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

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