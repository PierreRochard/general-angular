import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {ButtonModule, DataTableModule, MenubarModule, PasswordModule, InputTextModule} from 'primeng/primeng';


import {RestEffects} from "./rest/rest.effects";
import {SchemaEffects} from "./schema/schema.effects";

import {MenubarComponent} from "./common/menubar.container";

import {PathContainer} from "./paths/path.container";
import {HomeContainer} from "./home/home.container";
import {RpcContainer} from "./rpc/rpc.container";
import {TableContainer} from "./table/table.container";


import {FormComponent} from "./form/form.component";
import {FormElementComponent} from "./form/form-element.component";
import {FormCreationService} from "./form/form-creation.service";

import {TableDatatableComponent} from "./table/table-datatable.component";

import {RestClient} from "./rest/rest.service";

import {SchemaGuard} from "./schema/schema.guard";

import {reducer} from './app.reducers';
import {routing} from "./app.routing";
import {AppComponent} from "./app.component";
import {AuthEffects} from "./auth/auth.effects";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeContainer,
    MenubarComponent,
    PathContainer,
    RpcContainer,
    FormComponent,
    FormElementComponent,
    TableContainer,
    TableDatatableComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DataTableModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(SchemaEffects),
    EffectsModule.run(RestEffects),
    FormsModule,
    HttpModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterStoreModule.connectRouter(),
    routing,
    StoreModule.provideStore(reducer),
  ],
  providers: [
    RestClient,
    FormCreationService,
    SchemaGuard,
  ]
})
export class AppModule { }
