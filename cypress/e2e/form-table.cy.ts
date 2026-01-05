describe('Form and Table flows', () => {
  beforeEach(() => {
    cy.fixture('menubar').as('menubar');
    cy.fixture('login-form').as('loginForm');
    cy.fixture('datatable').as('datatable');
  });

  it('renders login form and submits', () => {
    cy.get('@menubar').then(menubar => {
      cy.intercept('GET', 'https://admin.rochard.org/menubar', {
        statusCode: 200,
        body: menubar,
      });
    });
    cy.get('@loginForm').then(loginForm => {
      cy.intercept('GET', 'https://admin.rochard.org/forms*', {
        statusCode: 200,
        body: loginForm.forms,
      }).as('getForm');
      cy.intercept('GET', 'https://admin.rochard.org/form_fields*', {
        statusCode: 200,
        body: loginForm.fields,
        delayMs: 50,
      }).as('getFields');
    });
    cy.intercept('POST', 'https://auth.rochard.org/rpc/login', {
      statusCode: 200,
      body: [{ token: 'fake-token' }],
    }).as('postLogin');

    cy.visit('/auth/rpc/login');
    cy.wait(['@getForm', '@getFields']);
    cy.get('input#username').type('tester');
    cy.get('input#password').type('supersafe');
    cy.contains('button', 'Submit').click();
    cy.wait('@postLogin').its('request.body').should('deep.include', { username: 'tester', password: 'supersafe' });
  });

  it('handles login validation and error response', () => {
    cy.get('@menubar').then(menubar => {
      cy.intercept('GET', 'https://admin.rochard.org/menubar', { statusCode: 200, body: menubar });
    });
    cy.get('@loginForm').then(loginForm => {
      cy.intercept('GET', 'https://admin.rochard.org/forms*', { statusCode: 200, body: loginForm.forms });
      cy.intercept('GET', 'https://admin.rochard.org/form_fields*', { statusCode: 200, body: loginForm.fields });
    });
    cy.intercept('POST', 'https://auth.rochard.org/rpc/login', {
      statusCode: 401,
      body: { message: 'Unauthorized' },
    }).as('postLoginUnauthorized');

    cy.visit('/auth/rpc/login');
    cy.contains('button', 'Submit').click();
    cy.contains('Username is required');
    cy.contains('Password is required');

    cy.get('input#username').type('tester');
    cy.get('input#password').type('bad');
    cy.contains('button', 'Submit').click();
    cy.wait('@postLoginUnauthorized');
    cy.url().should('include', '/auth/rpc/login');
  });

  it('shows table data, sorting, pagination, and archive action', () => {
    cy.get('@menubar').then(menubar => {
      cy.intercept('GET', 'https://admin.rochard.org/menubar', { statusCode: 200, body: menubar });
    });
    cy.get('@menubar').then(menubar => {
      cy.intercept('GET', 'https://admin.rochard.org/menubar', { statusCode: 200, body: menubar });
    });
    cy.get('@datatable').then(({ datatable, columns, records, emptyRecords }) => {
      cy.intercept('GET', 'https://admin.rochard.org/datatables*', {
        statusCode: 200,
        body: [datatable],
      }).as('getDatatable');
      cy.intercept('GET', 'https://admin.rochard.org/datatable_columns*', {
        statusCode: 200,
        body: columns,
      }).as('getColumns');
      cy.intercept('GET', 'https://chartofaccounts.rochard.org/accounts*', {
        statusCode: 200,
        headers: { 'content-range': '0-2/3' },
        body: records,
      }).as('getRecords');
    });

    const persistedState = JSON.stringify({ auth: { token: 'fake-token' } });
    cy.visit('/chart_of_accounts/accounts', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('appState', persistedState);
      },
    });
    cy.wait(['@getDatatable', '@getColumns', '@getRecords']);
    cy.contains('Accounts', { timeout: 10000 }).should('exist');
    cy.get('table[mat-table]', { timeout: 10000 }).within(() => {
      cy.get('tr.mat-mdc-row').should('have.length', 3);
    });

    cy.contains('th', 'Name').click();

    cy.get('mat-paginator').within(() => {
      cy.get('button.mat-mdc-icon-button[aria-label="Next page"]').click();
    });

    cy.get('button').contains('Archive').first().click();
    cy.screenshot('table-after-archive');
  });
});
