import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {ButtonModule, MenubarModule, PasswordModule, InputTextModule} from 'primeng/primeng';


import {SchemaEffects} from "./schema/schema.effects";
import {EndpointEffects} from "./schema/endpoint.effects";

import { AppComponent } from './app.component';

import {HomePageComponent} from "./home/home.page";
import {ViewEndpointPageComponent} from "./endpoints/view-endpoint.page";
import {SelectedEndpointPageComponent} from "./endpoints/selected-endpoint.page";

import {MenubarComponent} from "./common/menubar.component";
import {RpcEndpointComponent} from "./endpoints/rpc-endpoint.component";
import {DynamicFormElementComponent} from "./endpoints/dynamic-form-element.component";

import {FormCreationService} from "./endpoints/form-creation.service";
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
    ViewEndpointPageComponent,
    SelectedEndpointPageComponent,
    RpcEndpointComponent,
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
    EffectsModule.run(EndpointEffects),
  ],
  providers: [
    SchemaGuard,
    RestClient,
    FormCreationService,
  ]
})
export class AppModule { }
