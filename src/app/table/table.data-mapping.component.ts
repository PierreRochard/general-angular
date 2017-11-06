import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuggestionsQuery } from './table.models';

@Component({
  selector: 'app-table-data-mapping-component',
  templateUrl: './table.data-mapping.component.html',
})
export class TableDataMappingComponent {
  public header = 'Transaction Mapping';
  public keyword_input: any = {
    is_dropdown: false,
    is_multiple: false,
    custom_name: 'Keyword',
    data: null,
    column:
      {
        'id': 124,
        'can_update': false,
        'column_name': 'description',
        'custom_name': 'Description',
        'data_type': 'text',
        'filter_match_mode': 'contains',
        'filter_value': null,
        'format_pattern': null,
        'input_type': 'text',
        'is_filterable': false,
        'is_multiple': false,
        'is_select_item': false,
        'is_sortable': true,
        'is_visible': true,
        'schema_name': 'banking',
        'select_item_schema_name': null,
        'select_item_table_name': null,
        'select_item_label_column_name': null,
        'select_item_value_column_name': null,
        'suggestion_column_name': 'keyword',
        'suggestion_schema_name': 'bookkeeping',
        'suggestion_table_name': 'mappings',
        'table_name': 'transactions',
        'user_id': '1840e030-186e-4be3-a517-79762a96427d',
        'styles': {
          'height': 'auto',
          'overflow': 'visible',
          'padding-bottom': 'auto',
          'padding-left': 'auto',
          'padding-right': 'auto',
          'padding-top': 'auto',
          'width': '350px',
        },
      },
    style: {
      width: '100%'
    }
  };

  public mapping_input: any = {
    is_dropdown: false,
    is_multiple: false,
    custom_name: 'Mapping',
    data: null,
    column: {
      'id': 74,
      'can_update': false,
      'column_name': 'name',
      'custom_name': 'Name',
      'data_type': 'character varying',
      'filter_match_mode': 'contains',
      'filter_value': null,
      'format_pattern': null,
      'input_type': 'text',
      'is_filterable': false,
      'is_multiple': false,
      'is_select_item': false,
      'is_sortable': true,
      'is_visible': true,
      'schema_name': 'chart_of_accounts',
      'select_item_schema_name': null,
      'select_item_table_name': null,
      'select_item_label_column_name': null,
      'select_item_value_column_name': null,
      'suggestion_column_name': 'name',
      'suggestion_schema_name': 'chart_of_accounts',
      'suggestion_table_name': 'expense_subaccounts',
      'table_name': 'expense_subaccounts',
      'user_id': '1840e030-186e-4be3-a517-79762a96427d',
      'styles': {
        'height': 'auto',
        'overflow': 'visible',
        'padding-bottom': 'auto',
        'padding-left': 'auto',
        'padding-right': 'auto',
        'padding-top': 'auto',
        'width': '200px'
      }
    },
    style: {
      width: '100%'
    }
  };

  public mapping_table: any = {
    'schema_name': 'bookkeeping',
    'table_name': 'mappings',
    'keyword_column_name': 'keyword',
    'mapping_column_name': 'negative_debit_subaccount_id'
  };

  @Input() suggestions: string[];

  @Output() getKeywordSuggestions = new EventEmitter<SuggestionsQuery>();
  @Output() getMappingSuggestions = new EventEmitter<SuggestionsQuery>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onEditComplete = new EventEmitter<any>();


  onCellEditorKeydown(event: any) {
    this.onEdit.emit({
      originalEvent: event,
      // column: column,
      // data: rowData,
      // index: rowIndex,
    });

    if (event.keyCode === 13) { // enter
      this.onEditComplete.emit({
        // column: column,
        // data: rowData,
        // index: rowIndex,
      });
    } else if (event.keyCode === 27) { // escape
      this.onEditCancel.emit({
        // column: column,
        // data: rowData,
        // index: rowIndex,
      });
      event.preventDefault();
    } else if (event.keyCode === 9) { // tab
      this.onEditComplete.emit({
        // column: column,
        // data: rowData,
        // index: rowIndex,
      });
    }
  }
}
