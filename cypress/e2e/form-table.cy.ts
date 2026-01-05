const datatable = {
  can_archive: true,
  can_delete: true,
  custom_name: 'Accounts',
  order_index: 0,
  row_limit: 10,
  row_offset: 0,
  schema_name: 'chart_of_accounts',
  sort_column: 'name',
  sort_order: 1,
  table_name: 'accounts',
  user_id: 'user-1',
  filter_columns: [],
};

const columns = [
  {
    can_update: true,
    column_name: 'name',
    custom_name: 'Name',
    data_type: 'text',
    filter_match_mode: 'contains',
    filter_value: '',
    format_pattern: '',
    input_type: 'text',
    is_filterable: true,
    is_multiple: false,
    is_select_item: false,
    is_sortable: true,
    is_visible: true,
    schema_name: 'chart_of_accounts',
    select_item_label_column_name: '',
    select_item_schema_name: '',
    select_item_table_name: '',
    select_item_value_column_name: '',
    styles: {
      height: 'auto',
      overflow: 'visible',
      'padding-bottom': '0px',
      'padding-left': '0px',
      'padding-right': '0px',
      'padding-top': '0px',
      width: '200px',
    },
    suggestion_column_name: '',
    suggestion_schema_name: '',
    suggestion_table_name: '',
    table_name: 'accounts',
    user_id: 'user-1',
  },
];

describe('Form and Table flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://admin.rochard.org/menubar', {
      statusCode: 200,
      body: [{ label: 'Home', routerLink: '/' }],
    });
  });

  it('renders login form and submits', () => {
    cy.intercept('GET', 'https://admin.rochard.org/forms*', {
      statusCode: 200,
      body: [{ form_name: 'login', custom_name: 'Login' }],
    }).as('getForm');
    cy.intercept('GET', 'https://admin.rochard.org/form_fields*', {
      statusCode: 200,
      body: [{ field_name: 'username', custom_name: 'Username' }],
    }).as('getFields');
    cy.intercept('POST', 'https://auth.rochard.org/rpc/login', {
      statusCode: 200,
      body: [{ token: 'fake-token' }],
    }).as('postLogin');

    cy.visit('/auth/rpc/login');
    cy.wait(['@getForm', '@getFields']);
    cy.get('input#username').type('tester');
    cy.contains('button', 'Submit').click();
    cy.wait('@postLogin').its('request.body').should('deep.include', { username: 'tester' });
  });

  it('shows table data with archive action', () => {
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
      headers: { 'content-range': '0-0/1' },
      body: [{ id: 1, name: 'Cash' }],
    }).as('getRecords');

    const persistedState = JSON.stringify({ auth: { token: 'fake-token' } });
    cy.visit('/chart_of_accounts/accounts', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('appState', persistedState);
      },
    });
    cy.wait(['@getDatatable', '@getColumns', '@getRecords']);
    cy.contains('Accounts', { timeout: 10000 }).should('exist');
    cy.get('table[mat-table]', { timeout: 10000 }).within(() => {
      cy.get('tr.mat-mdc-row').should('have.length.at.least', 1);
    });
    cy.get('button').contains('Archive').click();
  });
});
