import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import { Datatable, DatatableColumn } from './table.models';

const columnsMockData: DatatableColumn[] = require('../../../mock_data/table/table.columns.response.mock.json');
const datatableMockDatas: Datatable[] = require('../../../mock_data/table/table.datatable.response.mock.json');
const recordsMockData: any[] = require('../../../mock_data/table/table.records.response.mock.json');

const datatableMockData: Datatable = datatableMockDatas[0];

describe('Component: TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        TableComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        RouterTestingModule,
      ],
    });
    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should render a material table', () => {
    component.columns = columnsMockData;
    component.datatable = datatableMockData;
    component.records = recordsMockData;
    component.totalRecords = recordsMockData.length;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('table[mat-table]'));
    expect(debugElement).toBeTruthy();
  });
});
