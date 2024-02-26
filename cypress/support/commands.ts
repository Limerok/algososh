import { defaultColor, changingColor } from '../../src/constants/testConstants';
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      addStackNode(text: string): Chainable<void>
      addQueueNode(text: string, position: number): Chainable<void>
    }
  }
}

Cypress.Commands.add("addStackNode", (text: string) => {
  cy.get('[data-testid="input"]').type(text);
  cy.get('[data-testid="add__button"]').should('not.be.disabled').click();
  cy.get('div[class*="circle_circle"]')
    .last()
    .should('have.text', text)
    .should('have.css', 'border-color', changingColor)

  cy.wait(100);

  cy.get('div[class*="circle_circle"]')
    .last()
    .should('have.text', text)
    .should('have.css', 'border-color', defaultColor)
})

Cypress.Commands.add("addQueueNode", (text: string, position: number) => {
  cy.get('[data-testid="input"]').type(text)
  cy.get('[data-testid="add__button"]').should('not.be.disabled').click()
  cy.get('div[class*="circle_circle"]')
    .eq(position)
    .should('have.css', 'border-color', changingColor)

  cy.wait(100);

  cy.get('div[class*="circle_circle"]')
    .eq(position)
    .should('have.css', 'border-color', defaultColor)
    .should('have.text', text)
})