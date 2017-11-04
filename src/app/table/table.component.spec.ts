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
import { SelectItem } from 'primeng/primeng';

const columnsMockData: DatatableColumn[] = require('../../../mock_data/table/table.columns.response.mock.json');
const datatableMockDatas: Datatable[] = require('../../../mock_data/table/table.datatable.response.mock.json');
const recordsMockData: any[] = require('../../../mock_data/table/table.records.response.mock.json');
const selectItemsMockData: SelectItem[] = require('../../../mock_data/table/table.selectitems.mock.json');

const datatableMockData: Datatable = datatableMockDatas[0];

describe('Component: TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let testDebugElement: DebugElement;
  let testNativeElement: HTMLElement;

  let subTestDebugElement: DebugElement;
  let subTestNativeElement: HTMLElement;

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
        RouterTestingModule,
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
      component.totalRecords = recordsMockData.length;
      spyOn(component.getSuggestions, 'emit').and.callThrough();
      spyOn(component.onEditComplete, 'emit').and.callThrough();
      fixture.detectChanges();
    });

    describe('dropdown editing', () => {
      beforeEach(() => {
        testNativeElement = getNativeElement('.ui-dropdown');
        testNativeElement.click();
        fixture.detectChanges();
      });

      it('should emit to getSuggestions when clicked', () => {
        expect(component.getSuggestions.emit).toHaveBeenCalled();
      });

      it('should render dropdown search', () => {
        expect(getNativeElement('.ui-dropdown-filter')).toBeDefined();
      });

      it('should render dropdown label', () => {
        expect(getNativeElement('.ui-dropdown-item').textContent.trim())
          .toEqual('Testing Value 1');
      });

      it('should emit to onEditComplete when clicked', () => {
        subTestNativeElement = getNativeElement('.ui-dropdown-item');
        subTestNativeElement.click();
        fixture.detectChanges();
        expect(component.onEditComplete.emit).toHaveBeenCalledWith(
          {
            'column': columnsMockData[1],
            'row': recordsMockData[0],
            'value': selectItemsMockData[0].value,
          });
      });
    });
  });
});
