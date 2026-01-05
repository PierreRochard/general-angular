describe('Material app shell', () => {
  beforeEach(() => {
    cy.intercept('https://admin.rochard.org/menubar', {
      statusCode: 200,
      body: [{ label: 'Home', routerLink: '/' }],
    });
    cy.visit('/');
  });

  it('renders the menubar and title', () => {
    cy.get('mat-toolbar').contains('Data Browser').should('exist');
    cy.get('button').contains(/home/i).should('exist');
  });

  it('shows the home welcome content', () => {
    cy.contains('Welcome!').should('exist');
  });
});
