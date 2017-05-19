import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';

import {routerActions} from '@ngrx/router-store';
import {SendGetRequestAction} from '../rest/rest.actions';
import {ConnectAction} from '../websocket/websocket.actions';

@Injectable()
export class TableEffects {

  @Effect()
  getTable$ = this.actions$
    .ofType(routerActions.UPDATE_LOCATION)
    .filter(action => !(action.payload.path.startsWith('/rpc/') || action.payload.path === '/'))
    .mergeMap(action => [new SendGetRequestAction({path: action.payload.path}),
                         new ConnectAction(action.payload.path)]);

  constructor(private actions$: Actions) {}
}
