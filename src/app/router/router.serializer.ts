import { Params, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: any;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    let params = null;
    console.log(routerState);
    if (routerState.root.children.length > 0) {
      params = routerState.root.children['0'].params;
    }
    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams, params };
  }
}
