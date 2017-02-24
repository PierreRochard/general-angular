import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./home/home.page";
import {SchemaGuard} from "./schema/schema.guard";
import {ViewPathPageComponent} from "./paths/view-path.container";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [SchemaGuard],
    pathMatch: 'full',
  },
  {
    path: 'rpc/:pathName',
    component: ViewPathPageComponent,
    canActivate: [SchemaGuard],
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
