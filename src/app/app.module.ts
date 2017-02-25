import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {ButtonModule, MenubarModule, PasswordModule, InputTextModule} from 'primeng/primeng';


import {SchemaEffects} from "./schema/schema.effects";

import {MenubarComponent} from "./common/menubar.container";

import {PathContainer} from "./paths/path.container";
import {HomeContainer} from "./home/home.container";
import {RpcContainer} from "./rpc/rpc.container";
import {TableContainer} from "./table/table.container";


import {RpcFormComponent} from "./rpc/rpc-form.component";
import {RpcFormElementComponent} from "./rpc/rpc-form-element.component";
import {RpcFormCreationService} from "./rpc/rpc-form-creation.service";


import {RestClient} from "./common/rest-client.service";

import {SchemaGuard} from "./schema/schema.guard";

import {rootReducer} from './app.reducers';
import {routing} from "./app.routing";
import {AppComponent} from "./app.component";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MenubarComponent,
    PathContainer,
    HomeContainer,
    RpcContainer,
    RpcFormComponent,
    RpcFormElementComponent,
    TableContainer,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(SchemaEffects),
  ],
  providers: [
    SchemaGuard,
    RestClient,
    RpcFormCreationService,
  ]
})
export class AppModule { }
