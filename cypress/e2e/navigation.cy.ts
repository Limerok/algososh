import { urlTest } from '../../src/constants/testConstants'

describe('app works correctly with routes', function() {
    beforeEach(function() {
      cy.visit(urlTest);
    });

    it('string route work correctly', function() {
        cy.get('[data-cy="stringComponent"]').click();
        cy.location('pathname').should('eq', '/recursion')
    });

    it('fibonacci route work correctly', function() {
        cy.get('[data-cy="fibonacciPage"]').click();
        cy.location('pathname').should('eq', '/fibonacci')
    });

    it('sorting route work correctly', function() {
        cy.get('[data-cy="sortingPage"]').click();
        cy.location('pathname').should('eq', '/sorting')
    });

    it('stack route work correctly', function() {
        cy.get('[data-cy="stackPage"]').click();
        cy.location('pathname').should('eq', '/stack')
    });

    it('queue route work correctly', function() {
        cy.get('[data-cy="queuePage"]').click();
        cy.location('pathname').should('eq', '/queue')
    });

    it('list route work correctly', function() {
        cy.get('[data-cy="listPage"]').click();
        cy.location('pathname').should('eq', '/list')
    });
  });