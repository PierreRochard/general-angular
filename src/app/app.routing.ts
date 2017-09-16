import {RouterModule, Routes} from '@angular/router';

import {FormContainer} from './form/form.container';
import {HomeContainer} from './home/home.container';
import {TableContainer} from './table/table.container';

export const routes: Routes = [
  {
    component: HomeContainer,
    path: '',
  },
  {
    component: FormContainer,
    path: ':selectedSchemaName/rpc/:selectedObjectName',
  },
  {
    component: TableContainer,
    path: ':selectedSchemaName/:selectedObjectName',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
