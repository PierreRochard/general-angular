import {Routes, RouterModule} from '@angular/router';

import {FormContainer} from "./form/form.container";
import {HomeContainer} from "./home/home.container";
import {TableContainer} from "./table/table.container";

export const routes: Routes = [
  {
    component: HomeContainer,
    path: '',
  },
  {
    component: FormContainer,
    path: 'rpc/:selectedPathName',
  },
  {
    component: TableContainer,
    path: '**',
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
