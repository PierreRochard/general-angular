import { Params, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer } from '@ngrx/router-store';

import { RouteParams } from './router.models';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: RouteParams;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const queryParams = routerState.root.queryParams;
    const params: any = {};
    let rpc_url = false;
    if (routerState.root.children.keys.length > 0) {
      params.selectedObjectName = routerState.root.children['0'].params;
      if (routerState.root.children['0'].url.length > 0) {
        rpc_url = routerState.root.children['0'].url['1'].path === 'rpc';
        params.selectedObjectType = rpc_url ? 'form' : 'table';
      }
    } else {
      params.selectedSchemaName = null;
      params.selectedObjectName = null;
      params.selectedObjectType = 'home';
    }
    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return {url, queryParams, params};
  }
}
