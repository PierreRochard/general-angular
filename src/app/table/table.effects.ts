import {Injectable} from "@angular/core";

import {Actions, Effect} from "@ngrx/effects";

import 'rxjs';

import {routerActions} from '@ngrx/router-store';
import * as rest from '../rest/rest.actions';
import * as websocket from '../websocket/websocket.actions';

@Injectable()
export class TableEffects {
  constructor(private actions$: Actions) {
  }

  @Effect()
  getTable$ = this.actions$
    .ofType(routerActions.UPDATE_LOCATION)
    .switchMap(action => {
      if (action.payload.path.startsWith('/rpc/') || action.payload.path === '/'){
        return []
      } else {

        return [new rest.SendGetRequestAction(action.payload.path),
                new websocket.ConnectAction(action.payload.path)]
      }
    });
}
