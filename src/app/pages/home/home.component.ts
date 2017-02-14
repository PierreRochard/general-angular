import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as schema from '../../actions/schema.actions';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  constructor(private store: Store<fromRoot.State>) {}

  onclick() {
    this.store.dispatch(new schema.RequestAction())
  }

}
