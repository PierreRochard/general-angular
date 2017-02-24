import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {ButtonModule, MenubarModule, PasswordModule, InputTextModule} from 'primeng/primeng';


import {SchemaEffects} from "./schema/schema.effects";

import { AppComponent } from './app.component';

import {HomePageComponent} from "./home/home.page";
import {ViewPathPageComponent} from "./paths/view-path.container";
import {SelectedRpcPathContainerComponent} from "./paths/selected-rpc-path.container";

import {MenubarComponent} from "./common/menubar.component";
import {RpcPathComponent} from "./paths/rpc-path.component";
import {DynamicFormElementComponent} from "./paths/dynamic-form-element.component";

import {FormCreationService} from "./paths/form-creation.service";
import {RestClient} from "./common/rest-client.service";

import {SchemaGuard} from "./schema/schema.guard";

import { reducer } from './app.reducers';
import {routing} from "./app.routing";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomePageComponent,
    MenubarComponent,
    ViewPathPageComponent,
    SelectedRpcPathContainerComponent,
    RpcPathComponent,
    DynamicFormElementComponent,
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
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(SchemaEffects),
  ],
  providers: [
    SchemaGuard,
    RestClient,
    FormCreationService,
  ]
})
export class AppModule { }
