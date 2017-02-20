import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./home/home.page";
import {SchemaGuard} from "./schema/schema.guard";
import {ViewEndpointPageComponent} from "./endpoints/view-endpoint.page";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [SchemaGuard],
    pathMatch: 'full',
  },
  {
    path: 'rpc/:endpointName',
    component: ViewEndpointPageComponent,
    canActivate: [SchemaGuard],
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
