import { circleClass, circleHead, circleTail, circles, urlTest } from '../../src/constants/testConstants';
import { changingColor } from '../../src/constants/testConstants';

describe('queue works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="queuePage"]').click();
    cy.get('[data-testid="input"]').clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get('[data-testid="input"]').should('contain', '')
    cy.get('[data-testid="add__button"]').should('be.disabled')
  });

  it('element adds correctly', function () {
    const text = '10';
    cy.addQueueNode(text, 0)

    cy.get(circleHead).as('circleHead')
    cy.get(circleTail).as('circleTail')

    cy.get('@circleHead')
      .eq(0)
      .contains('head')

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')

    const newtext = '9';
    cy.addQueueNode(newtext, 1)

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')
      .should('not.exist')

    cy.get('@circleTail')
      .eq(1)
      .contains('tail')
  });

  it('element delete correctly', function () {
    const text = '10';
    cy.addQueueNode(text, 0)

    cy.get(circleHead).as('circleHead')
    cy.get(circleTail).as('circleTail')
    cy.get(circleClass).as('circle')

    cy.get('@circleHead')
      .eq(0)
      .contains('head')

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')

    const newtext = '9';
    cy.addQueueNode(newtext, 1)

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')
      .should('not.exist')

    cy.get('@circleTail')
      .eq(1)
      .contains('tail')

    cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border-color', changingColor)

    cy.get('@circle')
      .eq(0)
      .should('contain', '')


    cy.get('@circleHead')
      .eq(1)
      .contains('head')
  });

  it('cleaning delete correctly', function () {
    const text = '10';
    cy.addQueueNode(text, 0)

    cy.get(circleHead).as('circleHead')
    cy.get(circleTail).as('circleTail')
    cy.get(circleClass).as('circle')
    cy.get(circles).as('circles')

    cy.get('@circleHead')
      .eq(0)
      .contains('head')

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')

    const newtext = '9';
    cy.addQueueNode(newtext, 1)

    cy.get('@circleTail')
      .eq(0)
      .contains('tail')
      .should('not.exist')

    cy.get('@circleTail')
      .eq(1)
      .contains('tail')

    cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border-color', changingColor)

    cy.get('@circle')
      .eq(0)
      .should('contain', '')

    cy.get('@circleHead')
      .eq(1)
      .contains('head')

    cy.get('[data-testid="clean__button"]').should('not.be.disabled').click()
    cy.get('@circles')
      .should('contain', '')
  });
})