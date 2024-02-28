import { circleClass, circleHead, circleTail, circles, dataTestidAddbutton, dataTestidInput, urlTest } from '../../src/constants/testConstants';
import { changingColor } from '../../src/constants/testConstants';

describe('stack works correctly', function () {
  beforeEach(function () {
    cy.visit(urlTest);
    cy.get('[data-cy="stackPage"]').click();
    cy.get(dataTestidInput).clear()
  });

  it('button is locked when the input is empty', function () {
    cy.get(dataTestidInput).should('contain', '')
    cy.get(dataTestidAddbutton).should('be.disabled')
  });

  it('element adds correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get(circleHead).as('circleHead')

    cy.get('@circleHead')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('@circleHead')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('@circleHead')
      .eq(1)
      .contains('top')
  });

  it('element delete correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get(circleHead).as('circleHead')
    cy.get(circleClass).as('circle')

    cy.get('@circleHead')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('@circleHead')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('@circleHead')
      .eq(1)
      .contains('top')

    cy.get('[data-testid="delete__button"]').should('not.be.disabled').click()
    cy.get('@circle')
      .eq(1)
      .should('have.text', newtext)
      .should('have.css', 'border-color', changingColor)

    cy.get('@circle')
      .eq(1)
      .should('not.exist')


    cy.get('@circleHead')
      .eq(0)
      .contains('top')
  })

  it('cleaning works correctly', function () {
    const text = '4';
    cy.addStackNode(text)

    cy.get(circleHead).as('circleHead')
    cy.get(circles).as('circles')

    cy.get('@circleHead')
      .eq(0)
      .contains('top')

    const newtext = '1';
    cy.addStackNode(newtext)

    cy.get('@circleHead')
      .eq(0)
      .contains('top')
      .should('not.exist')

    cy.get('@circleHead')
      .eq(1)
      .contains('top')

    cy.get('[data-testid="clean__button"]').should('not.be.disabled').click()
    cy.get('@circles')
      .should('not.exist')
  });
})