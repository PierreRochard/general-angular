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
    if (Object.keys(routerState.root.children['0'].params).length > 0) {
      params.selectedObjectName = routerState.root.children['0'].params.selectedObjectName;
      params.selectedSchemaName = routerState.root.children['0'].params.selectedSchemaName;
      if (routerState.root.children['0'].url.length > 0) {
        params.selectedObjectType = routerState.root.children['0'].url['1'].path === 'rpc'
          ? 'form'
          : 'table';
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
