import { Routes, RouterModule } from '@angular/router';

import {SchemaGuard} from "./schema/schema.guard";
import {PathContainer} from "./paths/path.container";

export const routes: Routes = [
  {
    component: PathContainer,
    path: '**',
    canActivate: [SchemaGuard],
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
