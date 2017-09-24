import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/operator/map';

import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { TableComponent } from './table.component';
import { Datatable, DatatableColumn } from './table.models';

const columnsMockData: DatatableColumn[] = require('../../../mock_data/table/table.columns.response.mock.json');
const datatableMockDatas: Datatable[] = require('../../../mock_data/table/table.datatable.response.mock.json');
const recordsMockData: any[] = require('../../../mock_data/table/table.records.response.mock.json');

const datatableMockData: Datatable = datatableMockDatas[0];

fdescribe('Component: TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let testNativeElement: HTMLElement;

  let getDebugElement: Function;
  let getNativeElement: Function;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        TableComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        DataTableModule,
        DropdownModule,
        RouterTestingModule
      ],
      providers: [],
    });
    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    getDebugElement = (selector: string): DebugElement => {
      return debugElement.query(By.css(selector));
    };

    getNativeElement = (selector: string): HTMLElement => {
      return getDebugElement(selector).nativeElement;
    };

    fixture.detectChanges();
  });

  it('should render PrimeNG datatable component', () => {
    testNativeElement = getNativeElement('p-datatable');
    expect(testNativeElement).toBeDefined();
  });

  describe(' loaded ', () => {

    beforeEach(() => {
      component.areRecordsLoading = true;
      component.columns = columnsMockData;
      component.datatable = datatableMockData;
      component.records = recordsMockData;
      component.rowLimit = datatableMockData.row_limit;
      component.rowOffset = datatableMockData.row_offset;
      component.schemaName = datatableMockData.schema_name;
      component.sortColumn = datatableMockData.sort_column;
      component.sortOrder = datatableMockData.sort_order;
      component.tableName = datatableMockData.table_name;
      component.totalRecords = recordsMockData.length;
      fixture.detectChanges();
    });

    it('should render Loading menuitem', () => {
      console.log(nativeElement);
      testNativeElement = getNativeElement('.ui-column-title');
      expect(testNativeElement.textContent).toEqual('');
    });

  });
  //
  // describe(' for anon ', () => {
  //
  //   beforeEach(() => {
  //     component.items = menubarAnonMenuitemsMockData;
  //     fixture.detectChanges();
  //   });
  //
  //   it('should render Login menuitem', () => {
  //     testNativeElement = getNativeElement('.ui-menuitem-text');
  //     expect(testNativeElement.textContent).toEqual(menubarAnonMenuitemsMockData[0].label);
  //   });
  // })

});
