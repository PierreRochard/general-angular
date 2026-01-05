import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { Store, StoreModule } from '@ngrx/store';


import { AppState, metaReducers, reducers } from '../app.reducers';

import { Datatable, DatatableColumn } from './table.models';
import { TableComponent } from 'app/table/table.component';
import { TableContainer } from './table.container';
import { RouteParams } from 'app/router/router.models';

const columnsMockData: DatatableColumn[] = require('../../../mock_data/table/table.columns.response.mock.json');
const datatableMockDatas: Datatable[] = require('../../../mock_data/table/table.datatable.response.mock.json');
const recordsMockData: any[] = require('../../../mock_data/table/table.records.response.mock.json');

export class DataStub {
  public static get(): Observable<RouteParams> {
    return of({
      'selectedObjectName': 'login',
      'selectedSchemaName': 'auth',
      'selectedObjectType': 'form',
    });
  }
}

describe('Component: TableContainer', () => {

  let component: TableContainer;
  let fixture: ComponentFixture<TableContainer>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  let store: Store<AppState>;
  let action;

  beforeEach(waitForAsync(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [
        TableContainer,
        TableComponent,
      ],
      imports: [
        CommonModule,
        StoreModule.forRoot(reducers, {metaReducers: metaReducers}),
      ],
      providers: [],
    });
    testBed.compileComponents();
    store = testBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContainer);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  describe(' initialize ', () => {

  });

  describe(' for anon ', () => {

    // beforeEach(() => {
    //   action = new ReceiveMenubarAction(menubarAnonResponseMockData);
    //   store.dispatch(action);
    // });
    //
    // it('should subscribe to items$', () => {
    //   component.items$.subscribe(value => {
    //     expect(value).toEqual(menubarAnonMenuitemsMockData);
    //   });
    // });
  })

});
