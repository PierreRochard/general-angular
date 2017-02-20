import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";

import {ButtonModule, MenubarModule, PasswordModule, InputTextModule} from 'primeng/primeng';


import {SchemaEffects} from "./effects/schema.effects";
import {EndpointEffects} from "./effects/endpoint.effects";

import { AppComponent } from './app.component';

import {HomePageComponent} from "./pages/home.page";
import {ViewEndpointPageComponent} from "./pages/view-endpoint.page";
import {SelectedEndpointPageComponent} from "./pages/selected-endpoint.page";

import {MenubarComponent} from "./components/menubar.component";
import {RpcEndpointComponent} from "./components/rpc-endpoint.component";
import {DynamicFormElementComponent} from "./components/dynamic-form-element.component";

import {FormCreationService} from "./services/form-creation.service";
import {RestClient} from "./services/rest-client.service";

import {SchemaGuard} from "./guards/schema.guard";

import { reducer } from './reducers';
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
