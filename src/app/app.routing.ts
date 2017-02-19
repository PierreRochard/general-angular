import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./pages/home.page";
import {SchemaGuard} from "./guards/schema.guard";
import {ViewEndpointPageComponent} from "./pages/view-endpoint.page";

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
