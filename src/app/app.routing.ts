import { Routes, RouterModule } from '@angular/router';

import {ApiUrlGuard} from "./auth/apiurl.guard";
import {SchemaGuard} from "./schema/schema.guard";

import {PathContainer} from "./paths/path.container";

export const routes: Routes = [
  {
    component: PathContainer,
    path: '**',
    canActivate: [ApiUrlGuard, SchemaGuard],
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
