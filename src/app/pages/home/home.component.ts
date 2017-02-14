import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as schema from '../../actions/schema.actions';
import {Observable} from "rxjs";

@Component({
  template: `
                <h1>Home</h1>
                
                <button pButton type="button" (click)="onclick()" label="Click"></button>
                {{ schema$ | async}}
                `
})
export class HomeComponent {
  schema$: Observable<any>;
  constructor(private store: Store<fromRoot.State>) {
    this.schema$ = store.select(fromRoot.getSchema);
  }

  onclick() {
    this.store.dispatch(new schema.RequestAction())
  }

}
