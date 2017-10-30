import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuggestionsQuery } from './table.models';
import { Column } from 'primeng/primeng';

@Component({
  selector: 'app-table-data-mapping-component',
  templateUrl: './table.data-mapping.component.html',
})
export class TableDataMappingComponent {
  public header = 'Transaction Mapping';
  public keyword_input: any = {
    is_dropdown: true,
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
        'suggestion_column_name': null,
        'suggestion_schema_name': null,
        'suggestion_table_name': null,
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
  };

  public mapping_input: any = {
    is_dropdown: true,
    is_multiple: false,
    custom_name: 'Mapping',
    data: null,
    // column: {''},
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
