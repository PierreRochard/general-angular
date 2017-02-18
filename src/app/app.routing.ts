import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home.component";
import {SchemaGuard} from "./guards/schema.guard";
import {RpcEndpointComponent} from "./pages/rpc-endpoint.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SchemaGuard],
    pathMatch: 'full',
  },
  {
    path: 'rpc/:endpointName',
    component: RpcEndpointComponent,
    canActivate: [SchemaGuard],
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
