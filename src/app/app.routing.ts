import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SchemaGuard} from "./guards/schema.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SchemaGuard],
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
