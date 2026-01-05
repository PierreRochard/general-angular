describe('App shell', () => {
  it('loads the home screen', () => {
    cy.visit('/');
    cy.contains('Welcome!').should('exist');
  });
});
