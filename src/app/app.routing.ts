import {Routes, RouterModule} from '@angular/router';

import {FormGuard} from './form/form.guard';
import {MenubarGuard} from './menubar/menubar.guard';
import {SchemaGuard} from './schema/schema.guard';

import {FormContainer} from "./form/form.container";
import {HomeContainer} from "./home/home.container";
import {TableContainer} from "./table/table.container";

export const routes: Routes = [
  {
    component: FormContainer,
    path: 'rpc/:selectedPathName',
    canActivate: [FormGuard, MenubarGuard],
  },
  {
    component: HomeContainer,
    path: '',
    canActivate: [MenubarGuard, SchemaGuard],
  },
  {
    component: TableContainer,
    path: '**',
    canActivate: [MenubarGuard, SchemaGuard],
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
