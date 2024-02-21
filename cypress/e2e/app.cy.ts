import { urlTest } from '../../src/constants/testConstants';

describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit(urlTest);
  });
}); 